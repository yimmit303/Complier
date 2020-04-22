import { TreeNode } from "./TreeNode";
import { Token } from "./Token";

declare var require:any;
let antlr4 = require('./antlr4');
let Lexer = require('./gramLexer.js').gramLexer;
let Parser = require('./gramParser.js').gramParser;

var asmCode: string[];
var labelCounter: number; 

enum VarType 
{
    INTEGER,
    FLOAT
}

export function parse(input: string): string
{
    let stream = new antlr4.InputStream(input);
    let lexer = new Lexer(stream);
    let tokens = new antlr4.CommonTokenStream(lexer);
    let parser = new Parser(tokens);
    parser.buildParseTrees = true;
    let handler = new ErrorHandler();
    lexer.removeErrorListeners();
    lexer.addErrorListener( handler );
    parser.removeErrorListeners()
    parser.addErrorListener( handler );
    let antlrroot = parser.program();
    let root : TreeNode = walk(parser,antlrroot);
    // print_tree(root);
    return makeAsm(root);
}

class ErrorHandler
{
    syntaxError(rec:any, sym:any, line:number, column:number,msg:string,e:any)
    {
        console.log("Syntax error:",msg,"on line",line,"at column",column);
        throw new Error("Syntax error in ANTLR parse");
    }
}


function emit( instr: string )
{
    asmCode.push(instr);
}

function emitfloatpush( register: string )
{
    // console.log("Float push");
    emit("\nsub rsp, 8            ; Float Push");
    emit(`movq [rsp], ${register}\n`);
}

function emitfloatpop( register: string )
{
    // console.log("Float pop");
    emit(`\nmovq ${register}, [rsp]       ; Float Pop`);
    emit("add rsp, 8\n");
}

function label(): string
{
    let s = "lbl"+labelCounter;
    labelCounter++;
    return s;
}

function print_tree(node: TreeNode)
{
    nodePrinter(node)
    for( let child of node.children)
    {
        print_tree(child);
    }
}

function ICE(calling_func:string, cause?: any)
{
    let error_string = "\nInternal Compiler Error Thrown.\nThe function that called this was " + calling_func;
    if (cause instanceof TreeNode)
    {
        let node = cause;
        nodePrinter(node);
        error_string += "\nThe Node that caused this error was: {" + node.sym + "} it had " + node.children.length + " children "
        if (node.token != null)
        {
            error_string += "\nThere was a token associated with this node. line number: " + node.token.line
        }
        else
        {
            error_string += "\nThere was no token associated with this node"
        }
    }
    else if(cause != undefined)
    {
        error_string += "This is what cause the error: " + cause;
    }
    throw new Error(error_string);
}

function nodePrinter(node: TreeNode)
{
    console.log("-=-=-={ Node Printout } =-=-=-")
    console.log("\tNode symbol: ", node.sym)
    if (node.children.length > 0)
    {
        for(let child of node.children)
        {
            console.log("\t\tChild: ", child);
        }
    }
    if (node.token != null)
    {
        console.log("\tToken Line number: " + node.token.line);
        console.log("\tToken Lexeme: " + node.token.lexeme);
    }
}

function walk(parser: any, node: any)
{
    let p: any = node.getPayload();
    if( p.ruleIndex === undefined )
    {
        let line: number = p.line;
        let lexeme: string = p.text;
        let ty: number = p.type;
        let sym: string = parser.symbolicNames[ty]
        if(sym === null )
            sym = lexeme.toUpperCase();
        let T = new Token( sym, lexeme, line)
        return new TreeNode( sym,T )
    } 
    else 
    {
        let idx: number = p.ruleIndex;
        let sym: string = parser.ruleNames[idx]
        let N = new TreeNode( sym, undefined )
        for(let i=0;i<node.getChildCount();++i){
            let child: any = node.getChild(i)
            N.children.push( walk( parser, child) );
        }
        return N;
    }
}

function convertStackTopToZeroOrOneInteger(type: VarType)
{
    if( type == VarType.INTEGER )
    {
        emit("\ncmp qword [rsp], 0        ; START Converting int on stack to 0/1");
        emit("setne al");
        emit("movzx rax, al");
        emit("mov [rsp], rax            ; END Convert int\n");
    } 
    else if ( type == VarType.FLOAT )
    {
        emit("\nxorpd xmm1, xmm1        ; START Converting float on stack to 0/1");
        // emit("add rsp,8");
        emit("movq xmm0, [rsp]");
        emit("cmpeqsd xmm0, xmm1");
        emit("movq [rsp], xmm0");
        emit("not qword [rsp]");
        emit("and qword [rsp], 1");
    }
    else 
    {
        ICE("convertStackTopToZeroOrOneInteger", type);
    }
}

function makeAsm( root: TreeNode )
{
    asmCode = [];
    labelCounter = 0;
    emit("default rel");
    emit("section .text");
    emit("global main");
    emit("main:");
    programNodeCode(root);
    emit("ret");
    emit("section .data");
    return asmCode.join("\n");
}

function programNodeCode(n: TreeNode) 
{
    //program -> braceblock
    if( n.sym != "program" )
    {
        ICE("programNodeCode", n);
    }
    braceblockNodeCode( n.children[0] );
}

function braceblockNodeCode(n: TreeNode)
{
    //braceblock -> LBR stmts RBR
    stmtsNodeCode(n.children[1]);
}

function stmtsNodeCode(n: TreeNode)
{
    //stmts -> stmt stmts | lambda
    if( n.children.length == 0 )
        return;
    stmtNodeCode(n.children[0]);
    stmtsNodeCode(n.children[1]);
}

function stmtNodeCode(n: TreeNode)
{
    //stmt -> cond | loop | return-stmt SEMI
    let c = n.children[0];
    switch( c.sym )
    {
        case "cond":
            condNodeCode(c); break;
        case "loop":
            loopNodeCode(c); break;
        case "return_stmt":
            returnstmtNodeCode(c); break;
        default:
            ICE("stmtNodeCode", c);
    }
}

function returnstmtNodeCode(n: TreeNode)
{
    // console.log("returnstmtNodeCode");
    // return-stmt -> RETURN expr
    // TODO
    var exprType = exprNodeCode( n.children[1] );
    if ( exprType == VarType.INTEGER )
    {
        emit("pop rax");
    }
    else if ( exprType == VarType.FLOAT )
    {
        emitfloatpop("xmm0");
        emit("cvtsd2si rax, xmm0");
    }

    emit("ret");
}

function exprNodeCode(n: TreeNode ) : VarType
{
    // console.log("exprNodeCode");
    return orexpNodeCode(n.children[0]);
}

function orexpNodeCode(n: TreeNode ): VarType
{
    // console.log("orexpNodeCode");
    // orexp : orexp OR andexp | andexp;
    if( n.children.length === 1 )
    {
        return andexpNodeCode(n.children[0]);
    }
    else
    {
        let orexpType = orexpNodeCode( n.children[0] );
        convertStackTopToZeroOrOneInteger(orexpType);
        let lbl = label();
        emit("cmp qword [rsp], 0");
        emit(`jne ${lbl}`);
        emit("add rsp,8");      //discard left result (0)
        let andexpType = andexpNodeCode( n.children[2] );
        convertStackTopToZeroOrOneInteger(andexpType);
        emit(`${lbl}:`);
        return VarType.INTEGER;   //always integer, even if float operands
    }
}

function andexpNodeCode(n: TreeNode ) : VarType
{
    // console.log("andexpNodeCode");
    // andexp : andexp AND notexp | notexp;
    if( n.children.length === 1 )
    {
        return notexpNodeCode(n.children[0]);
    }
    else
    {
        let andexpType = andexpNodeCode( n.children[0] );
        convertStackTopToZeroOrOneInteger(andexpType);  // stack has left side's result (1 or 0)
        let lbl = label();
        emit("cmp qword [rsp], 0");
        emit(`je ${lbl}`);
        emit("add rsp,8");      //discard left result (1)
        let notexpType = notexpNodeCode( n.children[2] );
        convertStackTopToZeroOrOneInteger(notexpType);
        emit(`${lbl}:`);
        return VarType.INTEGER;   //always integer, even if float operands
    }
}

function notexpNodeCode(n: TreeNode ) : VarType
{
    // console.log("notexpNodeCode");
    // notexp : NOT notexp | rel;
    if( n.children.length === 1 )
    {
        return relNodeCode(n.children[0]);
    }
    else
    {
        let notexpType = notexpNodeCode( n.children[1] );
        convertStackTopToZeroOrOneInteger(notexpType);
        emit("sub qword [rsp], 1");
        emit("neg qword [rsp]");
        return VarType.INTEGER;   //always integer, even if float operands 
    }
}

function relNodeCode(n: TreeNode ) : VarType
{
    // console.log("relNodeCode");
    //rel |rarr| sum RELOP sum | sum ???
    // rel : sum RELOP sum | sum;
    if( n.children.length === 1 )
    {
        return sumNodeCode( n.children[0] );
    }
    else 
    {
        let sum1Type = sumNodeCode( n.children[0] );
        let sum2Type = sumNodeCode( n.children[2] );
        // TODO
        if( sum1Type == VarType.INTEGER && sum2Type == VarType.INTEGER )
        {
            emit("pop rax");    //second operand
            //first operand still on stack
            emit("cmp [rsp],rax");    //do the compare
            switch( n.children[1].token.lexeme )
            {
                case ">=":   emit("setge al"); break;
                case "<=":   emit("setle al"); break;
                case ">":    emit("setg  al"); break;
                case "<":    emit("setl  al"); break;
                case "==":   emit("sete  al"); break;
                case "!=":   emit("setne al"); break;
                default:     ICE("relNodeCode", ["Bad relop", n.children[1].token.lexeme]);
            }
            emit("movzx qword rax, al");   //move with zero extend
            emit("mov [rsp], rax");
            return VarType.INTEGER;
        }
        else if ( sum1Type == VarType.FLOAT && sum2Type == VarType.FLOAT )
        {
            emit("movq xmm1, [rsp]");
            emit("add rsp,8")
            emit("movq xmm0, [rsp]");
            switch( n.children[1].token.lexeme )
            {
                case ">=":   emit("cmpnltsd xmm0, xmm1"); break;
                case "<=":   emit("cmplesd xmm0, xmm1"); break;
                case ">":    emit("cmpnlesd xmm0, xmm1"); break;
                case "<":    emit("cmpltsd xmm0, xmm1"); break;
                case "==":   emit("cmpeqsd xmm0, xmm1"); break;
                case "!=":   emit("cmpneqsd xmm0, xmm1"); break;
                default:     ICE("relNodeCode", ["Bad relop", n.children[1].token.lexeme]);
            }
            emit("movq [rsp], xmm0");
            emit("and qword [rsp], 1");
            return VarType.INTEGER; // Still an INT because relop always returns an INT
        }
        else
        {
            ICE("relNodeCode", [sum1Type, sum2Type]);
        }
    }
}

function sumNodeCode(n: TreeNode ): VarType
{
    // console.log("sumNodeCode");
    //sum -> sum PLUS term | sum MINUS term | term
    if( n.children.length === 1 )
    {
        return termNodeCode(n.children[0]);
    }
    else
    {
        let sumType = sumNodeCode( n.children[0] );
        let termType = termNodeCode( n.children[2] );
        // TODO
        if( sumType == VarType.INTEGER && termType == VarType.INTEGER )
        {
            emit("pop rbx");    //second operand
            emit("pop rax");    //first operand
            switch( n.children[1].sym )
            {
                case "PLUS":
                    emit("add rax, rbx");
                    break;
                case "MINUS":
                    emit("sub rax, rbx");
                    break;
                default:
                    ICE("sumNodeCode", n);
            }
            emit("push rax");
            return VarType.INTEGER
        }
        else if( sumType == VarType.FLOAT && termType == VarType.FLOAT )
        {
            emitfloatpop("xmm1");
            emitfloatpop("xmm0");
            switch( n.children[1].sym )
            {
                case "PLUS":
                    emit("addsd xmm0, xmm1");
                    break;
                case "MINUS":
                    emit("subsd xmm0, xmm1");
                    break;
                default:
                    ICE("sumNodeCode", n);
            }
            emitfloatpush("xmm0");
            return VarType.FLOAT;

        }
        else
        {
            ICE("sumNodeCode", ["Var types: ", sumType, termType]);
        }

    }
}

function termNodeCode(n: TreeNode ): VarType
{
    // console.log("termNodeCode");
    // term : term MULOP neg | neg;
    if( n.children.length === 1 )
    {
        return negNodeCode( n.children[0] );
    }
    else
    {
        let termType = termNodeCode( n.children[0] );
        let negType = negNodeCode( n.children[2] );
        // TODO
        if ( termType == VarType.INTEGER && negType == VarType.INTEGER )
        {
            emit("pop rbx");    //second operand
            emit("pop rax");    //first operand
            switch( n.children[1].token.lexeme )
            {
                case "*":
                    emit("imul rbx");
                    emit("push rax");
                    break;
                case "/":
                    emit("xor rdx, rdx");
                    emit("idiv rbx");
                    emit("push rax");
                    break;
                case "%":
                    emit("xor rdx, rdx")
                    emit("idiv rbx");
                    emit("push rdx");
                    break;
                default:
                    ICE("termNodeCode", n);
            }
            return VarType.INTEGER
        }
        else if ( termType == VarType.FLOAT && negType == VarType.FLOAT )
        {
            console.log("WE ARE IN FLOAT MULOP LAND");
            emitfloatpop("xmm1");
            emitfloatpop("xmm0");
            switch( n.children[1].token.lexeme )
            {
                case "*":
                    emit("mulsd xmm0, xmm1");
                    emitfloatpush("xmm0");
                    break;
                case "/":
                    emit("divsd xmm0, xmm1");
                    emitfloatpush("xmm0");
                    break;
                default:
                    ICE("termNodeCode", n);
            }
            return VarType.FLOAT;
        }
        else
        {
            ICE("termNodeCode", ["Var types: ", termType, negType]);
        }

    }
}

function negNodeCode(n: TreeNode ) : VarType
{
    // console.log("negNodeCode");
    // nodePrinter(n);
    // neg : MINUS neg | cast;
    if( n.children.length === 1 )
    {
        return castNodeCode( n.children[0] );
    }
    else
    {
        let negType = negNodeCode( n.children[1] ); // Gets the type of the neg child and puts its result into the stack
        if ( negType == VarType.INTEGER )
        {
            emit("pop rax");
            emit("neg rax");
            emit("push rax");
            return negType;
        }
        else if ( negType == VarType.FLOAT )
        {
            emit("movq xmm0, [rsp]");
            emit("xorpd xmm1, xmm1");
            emit("subsd xmm1, xmm0");
            emit("movq [rsp], xmm1");
            return negType;
        }
        else
        {
            ICE("negNodeCode", ["Var type: ", negType]);
        }

    }
}

function castNodeCode(n: TreeNode ) : VarType
{
    if( n.children.length === 1 )
    {
        return factorNodeCode( n.children[0] );
    }
    else
    {
        // cast : LP type RP cast | factor ;
        let castTo = n.children[1].token.lexeme;
        let castType = castNodeCode(n.children[3]);
        if ( castTo == "int" )
        {
            if ( castType == VarType.FLOAT )
            {
                emitfloatpop("xmm0");
                emit("roundsd xmm0, xmm0, 11");
                emit("cvtsd2si rax, xmm0");
                emit("push rax");
                return VarType.INTEGER;
            }
            else if ( castType == VarType.INTEGER )
            {
                return VarType.INTEGER;
            }
            else
            {
                ICE("castNodeCode", ["Trying to cast to int got bad type: ", castType])
            }

        }
        else if ( castTo == "double" )
        {
            if ( castType == VarType.INTEGER )
            {
                emit("pop rax");
                emit("cvtsi2sd xmm0, rax");
                emitfloatpush("xmm0");
                return VarType.FLOAT;
            }
            else if ( castType == VarType.FLOAT )
            {
                return VarType.FLOAT;
            }
            else
            {
                ICE("castNodeCode", "Expected int")
            }
        }
        else
        {
            ICE("castNodeCode", ["Bad castTo", castTo]);
        }
    }

}

function factorNodeCode( n: TreeNode) : VarType
{
    // console.log("factorNodeCode");
    //factor -> NUM | LP expr RP
    let child = n.children[0];
    switch( child.sym )
    {
        case "NUM":
            let v = parseInt( child.token.lexeme, 10 );
            emit(`push qword ${v}`)
            return VarType.INTEGER;
        case "FPNUM":
            let f =  parseFloat( child.token.lexeme );
            // console.log("Floating point parsed value = ", f);
            // mov rax, __float64__(42.0)      ;.0 is required
            // movq xmm0, rax
            // sub rsp,8
            // movq [rsp], xmm0
            emit(`mov rax, __float64__(${child.token.lexeme})`);
            emit("movq xmm0, rax");
            emitfloatpush("xmm0");
            return VarType.FLOAT;
        case "LP":
            return exprNodeCode( n.children[1] );
        default:
            ICE("factorNodeCode", child);
    }
}

function condNodeCode(n: TreeNode)
{
    //cond -> IF LP expr RP braceblock |
    //  IF LP expr RP braceblock ELSE braceblock

    if( n.children.length === 5 )
    {
        //no 'else'
        exprNodeCode(n.children[2]);    //leaves result in rax
        emit("pop rax");
        emit("cmp rax, 0");
        var endifLabel = label();
        emit(`je ${endifLabel}`);
        braceblockNodeCode(n.children[4]);
        emit(`${endifLabel}:`);
    } 
    //  IF LP expr RP braceblock ELSE braceblock
    else 
    {
        exprNodeCode(n.children[2]);    //leaves result in stack
        emit("pop rax");
        emit("cmp rax, 0");
        var endifLabel = label();
        emit(`je ${endifLabel}`);
        braceblockNodeCode(n.children[4]);
        var endelseLabel = label();
        emit(`jmp ${endelseLabel}`);
        emit(`${endifLabel}:`);
        braceblockNodeCode(n.children[6]);
        emit(`${endelseLabel}:`);
    }
}

function loopNodeCode(n: TreeNode)
{
    // WHILE LP expr RP braceblock;
    var startloopLabel = label();
    var endloopLabel = label();
    emit(`${startloopLabel}:`);
    exprNodeCode(n.children[2]);    // Currently just   mov rax, {num}
    emit("pop rax");
    emit("cmp rax, 0");             //                  cmp rax, 0
    emit(`je ${endloopLabel}`);
    braceblockNodeCode(n.children[4]);
    emit(`jmp ${startloopLabel}`);
    emit(`${endloopLabel}:`);
}