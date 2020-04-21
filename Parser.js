"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
var TreeNode_1 = require("./TreeNode");
var Token_1 = require("./Token");
var antlr4 = require('./antlr4');
var Lexer = require('./gramLexer.js').gramLexer;
var Parser = require('./gramParser.js').gramParser;
var asmCode;
var labelCounter;
function parse(input) {
    var stream = new antlr4.InputStream(input);
    var lexer = new Lexer(stream);
    var tokens = new antlr4.CommonTokenStream(lexer);
    var parser = new Parser(tokens);
    parser.buildParseTrees = true;
    var handler = new ErrorHandler();
    lexer.removeErrorListeners();
    lexer.addErrorListener(handler);
    parser.removeErrorListeners();
    parser.addErrorListener(handler);
    //this assumes your start symbol is 'start'
    var antlrroot = parser.program();
    var root = walk(parser, antlrroot);
    //print_tree(root);
    return makeAsm(root);
}
exports.parse = parse;
function emit(instr) {
    asmCode.push(instr);
}
function label() {
    var s = "lbl" + labelCounter;
    labelCounter++;
    return s;
}
function print_tree(node) {
    var e_1, _a;
    nodePrinter(node);
    try {
        for (var _b = __values(node.children), _c = _b.next(); !_c.done; _c = _b.next()) {
            var child = _c.value;
            print_tree(child);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
function ICE(node) {
    var error_string = "Internal Compiler Error Thrown\n The Node that caused this error was: {" + node.sym + "} it had " + node.children.length + " children ";
    if (node.token != null) {
        error_string += "\n There was a token associated with this node. line number: " + node.token.line;
    }
    else {
        error_string += "\nThere was no token associated with this node";
    }
    throw new Error(error_string);
}
function nodePrinter(node) {
    console.log("-=-=-={ Node Printout } =-=-=-");
    console.log("\tNode symbol: ", node.sym);
    if (node.token != null) {
        console.log("\tToken Line number: " + node.token.line);
        console.log("\tToken Lexeme: " + node.token.lexeme);
    }
}
function walk(parser, node) {
    var p = node.getPayload();
    if (p.ruleIndex === undefined) {
        var line = p.line;
        var lexeme = p.text;
        var ty = p.type;
        var sym = parser.symbolicNames[ty];
        if (sym === null)
            sym = lexeme.toUpperCase();
        var T = new Token_1.Token(sym, lexeme, line);
        return new TreeNode_1.TreeNode(sym, T);
    }
    else {
        var idx = p.ruleIndex;
        var sym = parser.ruleNames[idx];
        var N = new TreeNode_1.TreeNode(sym, undefined);
        for (var i = 0; i < node.getChildCount(); ++i) {
            var child = node.getChild(i);
            N.children.push(walk(parser, child));
        }
        return N;
    }
}
var ErrorHandler = /** @class */ (function () {
    function ErrorHandler() {
    }
    ErrorHandler.prototype.syntaxError = function (rec, sym, line, column, msg, e) {
        console.log("Syntax error:", msg, "on line", line, "at column", column);
        throw new Error("Syntax error in ANTLR parse");
    };
    return ErrorHandler;
}());
function makeAsm(root) {
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
function programNodeCode(n) {
    //program -> braceblock
    if (n.sym != "program") {
        ICE(n);
    }
    braceblockNodeCode(n.children[0]);
}
function braceblockNodeCode(n) {
    //braceblock -> LBR stmts RBR
    stmtsNodeCode(n.children[1]);
}
function stmtsNodeCode(n) {
    //stmts -> stmt stmts | lambda
    if (n.children.length == 0)
        return;
    stmtNodeCode(n.children[0]);
    stmtsNodeCode(n.children[1]);
}
function stmtNodeCode(n) {
    //stmt -> cond | loop | return-stmt SEMI
    var c = n.children[0];
    switch (c.sym) {
        case "cond":
            condNodeCode(c);
            break;
        case "loop":
            loopNodeCode(c);
            break;
        case "return_stmt":
            returnstmtNodeCode(c);
            break;
        default:
            ICE(c);
    }
}
function returnstmtNodeCode(n) {
    //return-stmt -> RETURN expr
    exprNodeCode(n.children[1]);
    //...move result from expr to rax...
    emit("ret");
}
function exprNodeCode(n) {
    //expr -> NUM
    var d = parseInt(n.children[0].token.lexeme, 10);
    emit("mov rax, " + d);
}
function condNodeCode(n) {
    //cond -> IF LP expr RP braceblock |
    //  IF LP expr RP braceblock ELSE braceblock
    if (n.children.length === 5) {
        //no 'else'
        exprNodeCode(n.children[2]); //leaves result in rax
        emit("cmp rax, 0");
        var endifLabel = label();
        emit("je " + endifLabel);
        braceblockNodeCode(n.children[4]);
        emit(endifLabel + ":");
    }
    //  IF LP expr RP braceblock ELSE braceblock
    else {
        exprNodeCode(n.children[2]); //leaves result in rax
        emit("cmp rax, 0");
        var endifLabel = label();
        emit("je " + endifLabel);
        braceblockNodeCode(n.children[4]);
        var endelseLabel = label();
        emit("jmp " + endelseLabel);
        emit(endifLabel + ":");
        braceblockNodeCode(n.children[6]);
        emit(endelseLabel + ":");
    }
}
function loopNodeCode(n) {
    // WHILE LP expr RP braceblock;
    var startloopLabel = label();
    var endloopLabel = label();
    emit(startloopLabel + ":");
    exprNodeCode(n.children[2]); // Currently just   mov rax, {num}
    emit("cmp rax, 0"); //                  cmp rax, 0
    emit("je " + endloopLabel);
    braceblockNodeCode(n.children[4]);
    emit("jmp " + startloopLabel);
    emit(endloopLabel + ":");
}
