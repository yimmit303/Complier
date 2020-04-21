import { TreeNode } from "./TreeNode";
import { Token } from "./Token";

declare var require:any;
let antlr4 = require('./antlr4');
let Lexer = require('./gramLexer.js').gramLexer;
let Parser = require('./gramParser.js').gramParser;

var asmCode: string[];
var labelCounter: number; 

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
    //this assumes your start symbol is 'start'
    let antlrroot = parser.program();
    let root : TreeNode = walk(parser,antlrroot);
    //print_tree(root);
    return makeAsm(root);
}

function emit( instr: string )
{
    asmCode.push(instr);
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

function ICE(node: TreeNode)
{
    let error_string = "Internal Compiler Error Thrown\n The Node that caused this error was: {" + node.sym + "} it had " + node.children.length + " children "
    if (node.token != null)
    {
        error_string += "\n There was a token associated with this node. line number: " + node.token.line
    }
    else
    {
        error_string += "\nThere was no token associated with this node"
    }
    throw new Error(error_string);
}

function nodePrinter(node: TreeNode)
{
    console.log("-=-=-={ Node Printout } =-=-=-")
    console.log("\tNode symbol: ", node.sym)
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

class ErrorHandler
{
    syntaxError(rec:any, sym:any, line:number, column:number,msg:string,e:any)
    {
        console.log("Syntax error:",msg,"on line",line,"at column",column);
        throw new Error("Syntax error in ANTLR parse");
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
        ICE(n);
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
            ICE(c);
    }
}

function returnstmtNodeCode(n: TreeNode)
{
    //return-stmt -> RETURN expr
    exprNodeCode( n.children[1] );
    //...move result from expr to rax...
    emit("ret");
}

function exprNodeCode(n: TreeNode)
{
    //expr -> NUM
    let d = parseInt( n.children[0].token.lexeme, 10 );
    emit( `mov rax, ${d}` );
}

function condNodeCode(n: TreeNode)
{
    //cond -> IF LP expr RP braceblock |
    //  IF LP expr RP braceblock ELSE braceblock

    if( n.children.length === 5 )
    {
        //no 'else'
        exprNodeCode(n.children[2]);    //leaves result in rax
        emit("cmp rax, 0");
        var endifLabel = label();
        emit(`je ${endifLabel}`);
        braceblockNodeCode(n.children[4]);
        emit(`${endifLabel}:`);
    } 
    //  IF LP expr RP braceblock ELSE braceblock
    else 
    {
        exprNodeCode(n.children[2]);    //leaves result in rax
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
    emit("cmp rax, 0");             //                  cmp rax, 0
    emit(`je ${endloopLabel}`);
    braceblockNodeCode(n.children[4]);
    emit(`jmp ${startloopLabel}`);
    emit(`${endloopLabel}:`);
}