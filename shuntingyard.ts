import { Tokenizer } from "./Tokenizer";
import { TreeNode } from "./TreeNode";
import { Grammar } from "./Grammar";
import { Token } from "./Token";


var operandStack: TreeNode[] = [];
var operatorStack: TreeNode[] = [];
var initialized: boolean = false;

var precedence: Map<String, Number> = new Map();
var associativity: Map<String, String> = new Map();
var arity: Map<String, Number> = new Map();

var tokenizer: Tokenizer;
var grammar: Grammar;


function init()
{
    if (initialized) { return; }
    initialized = true

    precedence.set("ADDOP", 0);
    associativity.set("ADDOP", "left");
    arity.set("ADDOP", 2);

    precedence.set("MULOP", 1);
    associativity.set("MULOP", "left");
    arity.set("MULOP", 2);

    precedence.set("NEGATE", 3);
    associativity.set("NEGATE", "right");
    arity.set("NEGATE", 1);

    precedence.set("BITNOT", 3);
    associativity.set("BITNOT", "right");
    arity.set("BITNOT", 1);

    precedence.set("POWOP", 3);
    associativity.set("POWOP", "right");
    arity.set("POWOP", 2);

    precedence.set("LPAREN", -1);
    associativity.set("LPAREN", "none");
    arity.set("LPAREN", 2);

    precedence.set("func-call", 4);
    associativity.set("func-call", "left");
    arity.set("func-call", 2);

    precedence.set("COMMA", 5);
    associativity.set("COMMA", "left");
    arity.set("COMMA", 2);
    
    let gtext: string = "";
    gtext += "func-call -> \\w+\\s?[(]\n";
    gtext += "NUM -> \\d+\n";
    gtext += "ID -> \\w+\n";
    gtext += "ADDOP -> [-+]\n";
    gtext += "POWOP -> [*][*]\n";
    gtext += "MULOP -> [*/]\n";
    gtext += "BITNOT -> [~]\n";
    gtext += "LPAREN -> [(]\n";
    gtext += "RPAREN -> [)]\n";
    gtext += "COMMA -> [,]\n";


    grammar = new Grammar(gtext);
    tokenizer = new Tokenizer(grammar);
}

export function parse(input: string): TreeNode
{
    init();
    tokenizer.setInput(input);

    while(tokenizer.atEnd() == false)
    {
        let t = tokenizer.next();
        // console.log("This is the token ", t);
        if (t.lexeme == "-")
        {           
            let prev = tokenizer.previous();
            if (prev == null || prev.sym == "LPAREN" || prev.sym.endsWith("OP") ||  prev.sym == "NEGATE")
            {
                t.sym = "NEGATE";
            }
        }
        let sym = t.sym;
        if (sym === "NUM" || sym === "ID")
        {
            operandStack.push(new TreeNode(t.sym, t));
        }
        else if(sym === "$")
        {
            break;
        }
        else if(sym === "func-call")
        {
            operandStack.push(new TreeNode("ID", new Token("ID", t.lexeme.replace("(", ""), t.line)))
            operatorStack.push(new TreeNode("LPAREN", new Token("LPAREN", "(", t.line)))
            operatorStack.push(new TreeNode("func-call", new Token("func-call", "", t.line)))
        }
        else if(sym === "RPAREN")
        {
            while(true)
            {
                if (operatorStack[operatorStack.length - 1].sym === "LPAREN")
                {
                    operatorStack.pop();
                    break;
                }
                doOperation();
            }
        }
        else
        {
            let assoc = associativity.get(sym)
            while(true)
            {
                if (operatorStack.length == 0)
                {
                    break;
                }
                let A:String = operatorStack[operatorStack.length - 1].sym;
                if (assoc === "left" && precedence.get(A) >= precedence.get(sym))
                {
                    doOperation();
                }
                else if(assoc == "right" && precedence.get(A) > precedence.get(sym))
                {
                    doOperation();
                }
                else
                {
                    break;
                }
            }
            operatorStack.push(new TreeNode(t.sym, t));
        
        }
        // console.log(operandStack);
        // console.log("-=-=-=-=-=-=-=-=-=-=-=-");
        // console.log(operatorStack);
    }
    while (operatorStack.length > 0)
    {
        doOperation();
    }
    let node = operandStack.pop();
    // console.log(node);
    return node;
}

function doOperation()
{
    let opNode = operatorStack.pop()
    let c1 = operandStack.pop()
    if (arity.get(opNode.sym) == 2)
    {
        let c2 = operandStack.pop()
        opNode.addChild(c2)
    }
    opNode.addChild(c1)
    operandStack.push(opNode)
}