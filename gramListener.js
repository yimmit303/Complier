// Generated from gram.txt by ANTLR 4.8
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by gramParser.
function gramListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

gramListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
gramListener.prototype.constructor = gramListener;

// Enter a parse tree produced by gramParser#program.
gramListener.prototype.enterProgram = function(ctx) {
};

// Exit a parse tree produced by gramParser#program.
gramListener.prototype.exitProgram = function(ctx) {
};


// Enter a parse tree produced by gramParser#stmts.
gramListener.prototype.enterStmts = function(ctx) {
};

// Exit a parse tree produced by gramParser#stmts.
gramListener.prototype.exitStmts = function(ctx) {
};


// Enter a parse tree produced by gramParser#stmt.
gramListener.prototype.enterStmt = function(ctx) {
};

// Exit a parse tree produced by gramParser#stmt.
gramListener.prototype.exitStmt = function(ctx) {
};


// Enter a parse tree produced by gramParser#cond.
gramListener.prototype.enterCond = function(ctx) {
};

// Exit a parse tree produced by gramParser#cond.
gramListener.prototype.exitCond = function(ctx) {
};


// Enter a parse tree produced by gramParser#loop.
gramListener.prototype.enterLoop = function(ctx) {
};

// Exit a parse tree produced by gramParser#loop.
gramListener.prototype.exitLoop = function(ctx) {
};


// Enter a parse tree produced by gramParser#braceblock.
gramListener.prototype.enterBraceblock = function(ctx) {
};

// Exit a parse tree produced by gramParser#braceblock.
gramListener.prototype.exitBraceblock = function(ctx) {
};


// Enter a parse tree produced by gramParser#expr.
gramListener.prototype.enterExpr = function(ctx) {
};

// Exit a parse tree produced by gramParser#expr.
gramListener.prototype.exitExpr = function(ctx) {
};


// Enter a parse tree produced by gramParser#orexp.
gramListener.prototype.enterOrexp = function(ctx) {
};

// Exit a parse tree produced by gramParser#orexp.
gramListener.prototype.exitOrexp = function(ctx) {
};


// Enter a parse tree produced by gramParser#andexp.
gramListener.prototype.enterAndexp = function(ctx) {
};

// Exit a parse tree produced by gramParser#andexp.
gramListener.prototype.exitAndexp = function(ctx) {
};


// Enter a parse tree produced by gramParser#notexp.
gramListener.prototype.enterNotexp = function(ctx) {
};

// Exit a parse tree produced by gramParser#notexp.
gramListener.prototype.exitNotexp = function(ctx) {
};


// Enter a parse tree produced by gramParser#rel.
gramListener.prototype.enterRel = function(ctx) {
};

// Exit a parse tree produced by gramParser#rel.
gramListener.prototype.exitRel = function(ctx) {
};


// Enter a parse tree produced by gramParser#sum.
gramListener.prototype.enterSum = function(ctx) {
};

// Exit a parse tree produced by gramParser#sum.
gramListener.prototype.exitSum = function(ctx) {
};


// Enter a parse tree produced by gramParser#term.
gramListener.prototype.enterTerm = function(ctx) {
};

// Exit a parse tree produced by gramParser#term.
gramListener.prototype.exitTerm = function(ctx) {
};


// Enter a parse tree produced by gramParser#neg.
gramListener.prototype.enterNeg = function(ctx) {
};

// Exit a parse tree produced by gramParser#neg.
gramListener.prototype.exitNeg = function(ctx) {
};


// Enter a parse tree produced by gramParser#cast.
gramListener.prototype.enterCast = function(ctx) {
};

// Exit a parse tree produced by gramParser#cast.
gramListener.prototype.exitCast = function(ctx) {
};


// Enter a parse tree produced by gramParser#factor.
gramListener.prototype.enterFactor = function(ctx) {
};

// Exit a parse tree produced by gramParser#factor.
gramListener.prototype.exitFactor = function(ctx) {
};


// Enter a parse tree produced by gramParser#return_stmt.
gramListener.prototype.enterReturn_stmt = function(ctx) {
};

// Exit a parse tree produced by gramParser#return_stmt.
gramListener.prototype.exitReturn_stmt = function(ctx) {
};



exports.gramListener = gramListener;