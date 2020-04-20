import { TreeNode } from "./TreeNode";
import { Token } from "./Token";

declare var require:any;
let antlr4 = require('./antlr4');
let Lexer = require('./gramLexer.js').gramLexer;
let Parser = require('./gramParser.js').gramParser;

export function parse(input: string): TreeNode
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
    let antlrroot = parser.start();
    let root : TreeNode = walk(parser,antlrroot);
    return root;
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