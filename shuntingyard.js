"use strict";
exports.__esModule = true;
var Tokenizer_1 = require("./Tokenizer");
var TreeNode_1 = require("./TreeNode");
var Grammar_1 = require("./Grammar");
var Token_1 = require("./Token");
var operandStack = [];
var operatorStack = [];
var initialized = false;
var precedence = new Map();
var associativity = new Map();
var arity = new Map();
var tokenizer;
var grammar;
function init() {
    if (initialized) {
        return;
    }
    initialized = true;
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
    precedence.set("func-call", 4);
    associativity.set("func-call", "left");
    arity.set("func-call", 2);
    precedence.set("COMMA", 5);
    associativity.set("COMMA", "left");
    arity.set("COMMA", 2);
    var gtext = "";
    gtext += "func-call -> \\w+\\s?[(]\n";
    gtext += "NUM -> \\d+\n";
    gtext += "ID -> \\w+\n";
    gtext += "ADDOP -> [-+]\n";
    gtext += "POWOP -> [*][*]\n";
    gtext += "MULOP -> [*/]\n";
    gtext += "BITNOT -> [~]\n";
    gtext += "LP -> [(]\n";
    gtext += "RP -> [)]\n";
    gtext += "COMMA -> [,]\n";
    grammar = new Grammar_1.Grammar(gtext);
    tokenizer = new Tokenizer_1.Tokenizer(grammar);
}
function expr_parse(input) {
    init();
    tokenizer.setInput(input);
    while (tokenizer.atEnd() == false) {
        var t = tokenizer.next();
        // console.log("This is the token ", t);
        if (t.lexeme == "-") {
            var prev = tokenizer.previous();
            if (prev == null || prev.sym == "LP" || prev.sym.endsWith("OP") || prev.sym == "NEGATE") {
                t.sym = "NEGATE";
            }
        }
        var sym = t.sym;
        if (sym === "NUM" || sym === "ID") {
            operandStack.push(new TreeNode_1.TreeNode(t.sym, t));
        }
        else if (sym === "$") {
            break;
        }
        else if (sym === "func-call") {
            operandStack.push(new TreeNode_1.TreeNode("ID", new Token_1.Token("ID", t.lexeme.replace("(", ""), t.line)));
            operatorStack.push(new TreeNode_1.TreeNode("LP", new Token_1.Token("LPAREN", "(", t.line)));
            operatorStack.push(new TreeNode_1.TreeNode("func-call", new Token_1.Token("func-call", "", t.line)));
        }
        else if (sym === "RP") {
            while (true) {
                if (operatorStack[operatorStack.length - 1].sym === "LP") {
                    operatorStack.pop();
                    break;
                }
                doOperation();
            }
        }
        else if (sym === "LP") {
            operatorStack.push(new TreeNode_1.TreeNode("LP", new Token_1.Token("LP", "(", t.line)));
        }
        else {
            var assoc = associativity.get(sym);
            while (true) {
                if (operatorStack.length == 0) {
                    break;
                }
                var A = operatorStack[operatorStack.length - 1].sym;
                if (assoc === "left" && precedence.get(A) >= precedence.get(sym)) {
                    doOperation();
                }
                else if (assoc == "right" && precedence.get(A) > precedence.get(sym)) {
                    doOperation();
                }
                else {
                    break;
                }
            }
            operatorStack.push(new TreeNode_1.TreeNode(t.sym, t));
        }
        // console.log(operandStack);
        // console.log("-=-=-=-=-=-=-=-=-=-=-=-");
        // console.log(operatorStack);
    }
    while (operatorStack.length > 0) {
        doOperation();
    }
    var node = operandStack.pop();
    // console.log(node);
    return node;
}
exports.expr_parse = expr_parse;
function doOperation() {
    var opNode = operatorStack.pop();
    var c1 = operandStack.pop();
    if (arity.get(opNode.sym) == 2) {
        var c2 = operandStack.pop();
        opNode.addChild(c2);
    }
    opNode.addChild(c1);
    operandStack.push(opNode);
}
