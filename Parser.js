"use strict";
exports.__esModule = true;
var TreeNode_1 = require("./TreeNode");
var Tokenizer_1 = require("./Tokenizer");
var Grammar_1 = require("./Grammar");
// S → stmt-list
// stmt-list → stmt stmt-list | λ
// stmt → loop | cond | assign SEMI | func-call SEMI | LBR stmt-list RBR | var-decl SEMI
// loop → WHILE LP expr RP stmt
// cond → IF LP expr RP stmt | IF LP expr RP stmt ELSE stmt
// assign → ID EQ expr
// expr → NUM | ID | expr ADDOP term | term
// term → term MULOP factor | factor
// factor → LP expr RP | NUM
// func-call → ID LP param-list RP
// param-list → λ | expr | expr CMA param-list’
// param-list’ → expr CMA param-list’ | expr
// var-decl → TYPE var-list
// var-list → ID | ID CMA var-list
var gram_str = "";
gram_str += "SEMI -> ;\n";
gram_str += "LBR -> [{]\n";
gram_str += "RBR -> [}]\n";
gram_str += "LP -> [(]\n";
gram_str += "RP -> [)]\n";
gram_str += "EQ -> =\n";
gram_str += "CMA -> ,\n";
gram_str += "IF -> \\bif\\b\n";
gram_str += "WHILE -> \\bwhile\\b\n";
gram_str += "ELSE -> \\belse\\b\n";
gram_str += "TYPE -> \\b(int|double)\\b\n";
gram_str += "NUM -> \\d+\n";
gram_str += "ID -> \[A-Za-z\_\]+\n";
var grammar = new Grammar_1.Grammar(gram_str);
var T = new Tokenizer_1.Tokenizer(grammar);
function parse(input) {
    T.setInput(input);
    // // console.log("Test Input: ", input);
    return parse_S();
}
exports.parse = parse;
function parse_S() {
    var n = new TreeNode_1.TreeNode("S", null);
    n.addChild(parse_stmt_list());
    // log_tree(n, 0);
    return n;
}
function parse_stmt_list() {
    // // console.log("Inot parse statment list");
    var n = new TreeNode_1.TreeNode("stmt-list", null);
    if (T.peek().sym == "RBR") {
        return n;
    }
    if (T.peek().sym != "$") {
        n.addChild(parse_stmt());
        n.addChild(parse_stmt_list());
    }
    return n;
}
// stmt-list → stmt stmt-list | λ
// stmt → loop | cond | assign SEMI | func-call SEMI | LBR stmt-list RBR | var-decl SEMI
// loop → WHILE LP expr RP stmt
// cond → IF LP expr RP stmt | IF LP expr RP stmt ELSE stmt
function parse_stmt() {
    // // console.log("Into parse stmt");
    var n = new TreeNode_1.TreeNode("stmt", null);
    if (T.peek().sym == "WHILE") {
        n.addChild(parse_loop());
    }
    else if (T.peek().sym == "IF") {
        n.addChild(parse_cond());
    }
    else if (T.peek().sym == "LBR") {
        n.addChild(new TreeNode_1.TreeNode("LBR", T.expect("LBR")));
        n.addChild(parse_stmt_list());
        n.addChild(new TreeNode_1.TreeNode("RBR", T.expect("RBR")));
    }
    else if (T.peek().sym == "TYPE") {
        n.addChild(parse_var_decl());
        n.addChild(new TreeNode_1.TreeNode("SEMI", T.expect("SEMI")));
    }
    else if (T.peek().sym == "ID") {
        if (T.peek2().sym == "EQ") {
            n.addChild(parse_assign());
        }
        else if (T.peek2().sym == "LP") {
            n.addChild(parse_func_call());
        }
        else {
            var error_string = "We saw an ID and expected to see either an EQ or LP. We got: " + T.peek2().sym;
            throw new Error(error_string);
        }
        n.addChild(new TreeNode_1.TreeNode("SEMI", T.expect("SEMI")));
    }
    else {
        var error_message = "Parse statement error got this token: " + T.peek();
        throw new Error(error_message);
    }
    return n;
}
function parse_loop() {
    // // console.log("Into parse loop");
    var n = new TreeNode_1.TreeNode("loop", null);
    n.addChild(new TreeNode_1.TreeNode("WHILE", T.expect("WHILE")));
    n.addChild(new TreeNode_1.TreeNode("LP", T.expect("LP")));
    n.addChild(parse_expr());
    n.addChild(new TreeNode_1.TreeNode("RP", T.expect("RP")));
    n.addChild(parse_stmt());
    return n;
}
function parse_cond() {
    // // console.log("Into parse cond");
    var n = new TreeNode_1.TreeNode("cond", null);
    n.addChild(new TreeNode_1.TreeNode("IF", T.expect("IF")));
    n.addChild(new TreeNode_1.TreeNode("LP", T.expect("LP")));
    n.addChild(parse_expr());
    n.addChild(new TreeNode_1.TreeNode("RP", T.expect("RP")));
    n.addChild(parse_stmt());
    if (T.peek().sym == "ELSE") {
        n.addChild(new TreeNode_1.TreeNode("ELSE", T.expect("ELSE")));
        n.addChild(parse_stmt());
    }
    return n;
}
function parse_assign() {
    // // console.log("Into parse assign");
    var n = new TreeNode_1.TreeNode("assign", null);
    n.addChild(new TreeNode_1.TreeNode("ID", T.expect("ID")));
    n.addChild(new TreeNode_1.TreeNode("EQ", T.expect("EQ")));
    n.addChild(parse_expr());
    return n;
}
// expr → NUM | ID | expr ADDOP term | term
// term → term MULOP factor | factor
// factor → LP expr RP | NUM
function parse_expr() {
    // // console.log("Into parse expr");
    var n = new TreeNode_1.TreeNode("expr", null);
    if (T.peek().sym == "NUM" || T.peek().sym == "ID") {
        var expr_t = T.next();
        n.addChild(new TreeNode_1.TreeNode(expr_t.sym, expr_t));
    }
    return n;
}
function parse_func_call() {
    // console.log("Into parse func call");
    var n = new TreeNode_1.TreeNode("func-call", null);
    n.addChild(new TreeNode_1.TreeNode("ID", T.expect("ID")));
    n.addChild(new TreeNode_1.TreeNode("LP", T.expect("LP")));
    n.addChild(parse_param_list());
    n.addChild(new TreeNode_1.TreeNode("RP", T.expect("RP")));
    return n;
}
function parse_param_list() {
    // console.log("Into parse param list");
    var n = new TreeNode_1.TreeNode("param-list", null);
    // console.log(T.peek().sym);
    if (T.peek().sym != "RP") {
        // param-list -> λ | expr | expr CMA param-list'
        n.addChild(parse_expr());
        if (T.peek().sym == "CMA") {
            n.addChild(new TreeNode_1.TreeNode("CMA", T.expect("CMA")));
            n.addChild(parse_param_list_());
        }
        // else, we're done
    }
    return n;
}
// param-list’ → expr CMA param-list’ | expr
function parse_param_list_() {
    // // console.log("Into parse param list'");
    var n = new TreeNode_1.TreeNode("param-list'", null);
    n.addChild(parse_expr());
    if (T.peek().sym == "CMA") {
        n.addChild(new TreeNode_1.TreeNode("CMA", T.expect("CMA")));
        n.addChild(parse_param_list_());
    }
    return n;
}
// var-decl → TYPE var-list
// var-list → ID | ID CMA var-list
function parse_var_decl() {
    var n = new TreeNode_1.TreeNode("var-decl", null);
    n.addChild(new TreeNode_1.TreeNode("TYPE", T.expect("TYPE")));
    n.addChild(parse_var_list());
    return n;
}
function parse_var_list() {
    var n = new TreeNode_1.TreeNode("var-list", null);
    n.addChild(new TreeNode_1.TreeNode("ID", T.expect("ID")));
    if (T.peek().sym == "CMA") {
        n.addChild(new TreeNode_1.TreeNode("CMA", T.expect("CMA")));
        n.addChild(parse_var_list());
    }
    return n;
}
