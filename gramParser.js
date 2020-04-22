// Generated from gram.txt by ANTLR 4.8
// jshint ignore: start
var antlr4 = require('antlr4/index');
var gramListener = require('./gramListener').gramListener;
var grammarFileName = "gram.txt";


var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003!\u00a2\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0004",
    "\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f\u0004",
    "\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010\u0004",
    "\u0011\t\u0011\u0004\u0012\t\u0012\u0003\u0002\u0003\u0002\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0005\u0003+\n\u0003\u0003\u0004",
    "\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0005\u00042\n\u0004",
    "\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005",
    "\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005",
    "\u0003\u0005\u0003\u0005\u0005\u0005B\n\u0005\u0003\u0006\u0003\u0006",
    "\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0007\u0003\u0007",
    "\u0003\u0007\u0003\u0007\u0003\b\u0003\b\u0003\t\u0003\t\u0003\t\u0003",
    "\t\u0003\t\u0003\t\u0007\tV\n\t\f\t\u000e\tY\u000b\t\u0003\n\u0003\n",
    "\u0003\n\u0003\n\u0003\n\u0003\n\u0007\na\n\n\f\n\u000e\nd\u000b\n\u0003",
    "\u000b\u0003\u000b\u0003\u000b\u0005\u000bi\n\u000b\u0003\f\u0003\f",
    "\u0003\f\u0003\f\u0003\f\u0005\fp\n\f\u0003\r\u0003\r\u0003\r\u0003",
    "\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0007\r{\n\r\f\r\u000e\r",
    "~\u000b\r\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e",
    "\u0003\u000e\u0007\u000e\u0086\n\u000e\f\u000e\u000e\u000e\u0089\u000b",
    "\u000e\u0003\u000f\u0003\u000f\u0003\u000f\u0005\u000f\u008e\n\u000f",
    "\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0005\u0010",
    "\u0095\n\u0010\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0011\u0003",
    "\u0011\u0003\u0011\u0005\u0011\u009d\n\u0011\u0003\u0012\u0003\u0012",
    "\u0003\u0012\u0003\u0012\u0002\u0006\u0010\u0012\u0018\u001a\u0013\u0002",
    "\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016\u0018\u001a\u001c\u001e",
    " \"\u0002\u0002\u0002\u009f\u0002$\u0003\u0002\u0002\u0002\u0004*\u0003",
    "\u0002\u0002\u0002\u00061\u0003\u0002\u0002\u0002\bA\u0003\u0002\u0002",
    "\u0002\nC\u0003\u0002\u0002\u0002\fI\u0003\u0002\u0002\u0002\u000eM",
    "\u0003\u0002\u0002\u0002\u0010O\u0003\u0002\u0002\u0002\u0012Z\u0003",
    "\u0002\u0002\u0002\u0014h\u0003\u0002\u0002\u0002\u0016o\u0003\u0002",
    "\u0002\u0002\u0018q\u0003\u0002\u0002\u0002\u001a\u007f\u0003\u0002",
    "\u0002\u0002\u001c\u008d\u0003\u0002\u0002\u0002\u001e\u0094\u0003\u0002",
    "\u0002\u0002 \u009c\u0003\u0002\u0002\u0002\"\u009e\u0003\u0002\u0002",
    "\u0002$%\u0005\f\u0007\u0002%\u0003\u0003\u0002\u0002\u0002&\'\u0005",
    "\u0006\u0004\u0002\'(\u0005\u0004\u0003\u0002(+\u0003\u0002\u0002\u0002",
    ")+\u0003\u0002\u0002\u0002*&\u0003\u0002\u0002\u0002*)\u0003\u0002\u0002",
    "\u0002+\u0005\u0003\u0002\u0002\u0002,2\u0005\b\u0005\u0002-2\u0005",
    "\n\u0006\u0002./\u0005\"\u0012\u0002/0\u0007\u0004\u0002\u000202\u0003",
    "\u0002\u0002\u00021,\u0003\u0002\u0002\u00021-\u0003\u0002\u0002\u0002",
    "1.\u0003\u0002\u0002\u00022\u0007\u0003\u0002\u0002\u000234\u0007\b",
    "\u0002\u000245\u0007\u0006\u0002\u000256\u0005\u000e\b\u000267\u0007",
    "\u0007\u0002\u000278\u0005\f\u0007\u00028B\u0003\u0002\u0002\u00029",
    ":\u0007\b\u0002\u0002:;\u0007\u0006\u0002\u0002;<\u0005\u000e\b\u0002",
    "<=\u0007\u0007\u0002\u0002=>\u0005\f\u0007\u0002>?\u0007\t\u0002\u0002",
    "?@\u0005\f\u0007\u0002@B\u0003\u0002\u0002\u0002A3\u0003\u0002\u0002",
    "\u0002A9\u0003\u0002\u0002\u0002B\t\u0003\u0002\u0002\u0002CD\u0007",
    "\u0005\u0002\u0002DE\u0007\u0006\u0002\u0002EF\u0005\u000e\b\u0002F",
    "G\u0007\u0007\u0002\u0002GH\u0005\f\u0007\u0002H\u000b\u0003\u0002\u0002",
    "\u0002IJ\u0007\u000b\u0002\u0002JK\u0005\u0004\u0003\u0002KL\u0007\f",
    "\u0002\u0002L\r\u0003\u0002\u0002\u0002MN\u0005\u0010\t\u0002N\u000f",
    "\u0003\u0002\u0002\u0002OP\b\t\u0001\u0002PQ\u0005\u0012\n\u0002QW\u0003",
    "\u0002\u0002\u0002RS\f\u0004\u0002\u0002ST\u0007\u000f\u0002\u0002T",
    "V\u0005\u0012\n\u0002UR\u0003\u0002\u0002\u0002VY\u0003\u0002\u0002",
    "\u0002WU\u0003\u0002\u0002\u0002WX\u0003\u0002\u0002\u0002X\u0011\u0003",
    "\u0002\u0002\u0002YW\u0003\u0002\u0002\u0002Z[\b\n\u0001\u0002[\\\u0005",
    "\u0014\u000b\u0002\\b\u0003\u0002\u0002\u0002]^\f\u0004\u0002\u0002",
    "^_\u0007\u0010\u0002\u0002_a\u0005\u0014\u000b\u0002`]\u0003\u0002\u0002",
    "\u0002ad\u0003\u0002\u0002\u0002b`\u0003\u0002\u0002\u0002bc\u0003\u0002",
    "\u0002\u0002c\u0013\u0003\u0002\u0002\u0002db\u0003\u0002\u0002\u0002",
    "ef\u0007\u0011\u0002\u0002fi\u0005\u0014\u000b\u0002gi\u0005\u0016\f",
    "\u0002he\u0003\u0002\u0002\u0002hg\u0003\u0002\u0002\u0002i\u0015\u0003",
    "\u0002\u0002\u0002jk\u0005\u0018\r\u0002kl\u0007\u0012\u0002\u0002l",
    "m\u0005\u0018\r\u0002mp\u0003\u0002\u0002\u0002np\u0005\u0018\r\u0002",
    "oj\u0003\u0002\u0002\u0002on\u0003\u0002\u0002\u0002p\u0017\u0003\u0002",
    "\u0002\u0002qr\b\r\u0001\u0002rs\u0005\u001a\u000e\u0002s|\u0003\u0002",
    "\u0002\u0002tu\f\u0005\u0002\u0002uv\u0007\u0014\u0002\u0002v{\u0005",
    "\u001a\u000e\u0002wx\f\u0004\u0002\u0002xy\u0007\u0016\u0002\u0002y",
    "{\u0005\u001a\u000e\u0002zt\u0003\u0002\u0002\u0002zw\u0003\u0002\u0002",
    "\u0002{~\u0003\u0002\u0002\u0002|z\u0003\u0002\u0002\u0002|}\u0003\u0002",
    "\u0002\u0002}\u0019\u0003\u0002\u0002\u0002~|\u0003\u0002\u0002\u0002",
    "\u007f\u0080\b\u000e\u0001\u0002\u0080\u0081\u0005\u001c\u000f\u0002",
    "\u0081\u0087\u0003\u0002\u0002\u0002\u0082\u0083\f\u0004\u0002\u0002",
    "\u0083\u0084\u0007\u0015\u0002\u0002\u0084\u0086\u0005\u001c\u000f\u0002",
    "\u0085\u0082\u0003\u0002\u0002\u0002\u0086\u0089\u0003\u0002\u0002\u0002",
    "\u0087\u0085\u0003\u0002\u0002\u0002\u0087\u0088\u0003\u0002\u0002\u0002",
    "\u0088\u001b\u0003\u0002\u0002\u0002\u0089\u0087\u0003\u0002\u0002\u0002",
    "\u008a\u008b\u0007\u0016\u0002\u0002\u008b\u008e\u0005\u001c\u000f\u0002",
    "\u008c\u008e\u0005\u001e\u0010\u0002\u008d\u008a\u0003\u0002\u0002\u0002",
    "\u008d\u008c\u0003\u0002\u0002\u0002\u008e\u001d\u0003\u0002\u0002\u0002",
    "\u008f\u0090\u0007\u0006\u0002\u0002\u0090\u0091\u0007\u0018\u0002\u0002",
    "\u0091\u0092\u0007\u0007\u0002\u0002\u0092\u0095\u0005\u001e\u0010\u0002",
    "\u0093\u0095\u0005 \u0011\u0002\u0094\u008f\u0003\u0002\u0002\u0002",
    "\u0094\u0093\u0003\u0002\u0002\u0002\u0095\u001f\u0003\u0002\u0002\u0002",
    "\u0096\u009d\u0007\u000e\u0002\u0002\u0097\u009d\u0007\r\u0002\u0002",
    "\u0098\u0099\u0007\u0006\u0002\u0002\u0099\u009a\u0005\u000e\b\u0002",
    "\u009a\u009b\u0007\u0007\u0002\u0002\u009b\u009d\u0003\u0002\u0002\u0002",
    "\u009c\u0096\u0003\u0002\u0002\u0002\u009c\u0097\u0003\u0002\u0002\u0002",
    "\u009c\u0098\u0003\u0002\u0002\u0002\u009d!\u0003\u0002\u0002\u0002",
    "\u009e\u009f\u0007\n\u0002\u0002\u009f\u00a0\u0005\u000e\b\u0002\u00a0",
    "#\u0003\u0002\u0002\u0002\u000f*1AWbhoz|\u0087\u008d\u0094\u009c"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, null, "';'", "'while'", "'('", "')'", "'if'", 
                     "'else'", "'return'", "'{'", "'}'", null, null, "'or'", 
                     "'and'", "'not'", null, "'='", "'+'", null, "'-'", 
                     "','", null, null, "'print'", "'input'", "'open'", 
                     "'read'", "'write'", "'close'" ];

var symbolicNames = [ null, "COMMENT", "SEMI", "WHILE", "LP", "RP", "IF", 
                      "ELSE", "RETURN", "LBR", "RBR", "FPNUM", "NUM", "OR", 
                      "AND", "NOT", "RELOP", "EQ", "PLUS", "MULOP", "MINUS", 
                      "CMA", "TYPE", "STRING_CONSTANT", "PRINT", "INPUT", 
                      "OPEN", "READ", "WRITE", "CLOSE", "ID", "WHITESPACE" ];

var ruleNames =  [ "program", "stmts", "stmt", "cond", "loop", "braceblock", 
                   "expr", "orexp", "andexp", "notexp", "rel", "sum", "term", 
                   "neg", "cast", "factor", "return_stmt" ];

function gramParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

gramParser.prototype = Object.create(antlr4.Parser.prototype);
gramParser.prototype.constructor = gramParser;

Object.defineProperty(gramParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

gramParser.EOF = antlr4.Token.EOF;
gramParser.COMMENT = 1;
gramParser.SEMI = 2;
gramParser.WHILE = 3;
gramParser.LP = 4;
gramParser.RP = 5;
gramParser.IF = 6;
gramParser.ELSE = 7;
gramParser.RETURN = 8;
gramParser.LBR = 9;
gramParser.RBR = 10;
gramParser.FPNUM = 11;
gramParser.NUM = 12;
gramParser.OR = 13;
gramParser.AND = 14;
gramParser.NOT = 15;
gramParser.RELOP = 16;
gramParser.EQ = 17;
gramParser.PLUS = 18;
gramParser.MULOP = 19;
gramParser.MINUS = 20;
gramParser.CMA = 21;
gramParser.TYPE = 22;
gramParser.STRING_CONSTANT = 23;
gramParser.PRINT = 24;
gramParser.INPUT = 25;
gramParser.OPEN = 26;
gramParser.READ = 27;
gramParser.WRITE = 28;
gramParser.CLOSE = 29;
gramParser.ID = 30;
gramParser.WHITESPACE = 31;

gramParser.RULE_program = 0;
gramParser.RULE_stmts = 1;
gramParser.RULE_stmt = 2;
gramParser.RULE_cond = 3;
gramParser.RULE_loop = 4;
gramParser.RULE_braceblock = 5;
gramParser.RULE_expr = 6;
gramParser.RULE_orexp = 7;
gramParser.RULE_andexp = 8;
gramParser.RULE_notexp = 9;
gramParser.RULE_rel = 10;
gramParser.RULE_sum = 11;
gramParser.RULE_term = 12;
gramParser.RULE_neg = 13;
gramParser.RULE_cast = 14;
gramParser.RULE_factor = 15;
gramParser.RULE_return_stmt = 16;


function ProgramContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = gramParser.RULE_program;
    return this;
}

ProgramContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ProgramContext.prototype.constructor = ProgramContext;

ProgramContext.prototype.braceblock = function() {
    return this.getTypedRuleContext(BraceblockContext,0);
};

ProgramContext.prototype.enterRule = function(listener) {
    if(listener instanceof gramListener ) {
        listener.enterProgram(this);
	}
};

ProgramContext.prototype.exitRule = function(listener) {
    if(listener instanceof gramListener ) {
        listener.exitProgram(this);
	}
};




gramParser.ProgramContext = ProgramContext;

gramParser.prototype.program = function() {

    var localctx = new ProgramContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, gramParser.RULE_program);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 34;
        this.braceblock();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function StmtsContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = gramParser.RULE_stmts;
    return this;
}

StmtsContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StmtsContext.prototype.constructor = StmtsContext;

StmtsContext.prototype.stmt = function() {
    return this.getTypedRuleContext(StmtContext,0);
};

StmtsContext.prototype.stmts = function() {
    return this.getTypedRuleContext(StmtsContext,0);
};

StmtsContext.prototype.enterRule = function(listener) {
    if(listener instanceof gramListener ) {
        listener.enterStmts(this);
	}
};

StmtsContext.prototype.exitRule = function(listener) {
    if(listener instanceof gramListener ) {
        listener.exitStmts(this);
	}
};




gramParser.StmtsContext = StmtsContext;

gramParser.prototype.stmts = function() {

    var localctx = new StmtsContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, gramParser.RULE_stmts);
    try {
        this.state = 40;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case gramParser.WHILE:
        case gramParser.IF:
        case gramParser.RETURN:
            this.enterOuterAlt(localctx, 1);
            this.state = 36;
            this.stmt();
            this.state = 37;
            this.stmts();
            break;
        case gramParser.RBR:
            this.enterOuterAlt(localctx, 2);

            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function StmtContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = gramParser.RULE_stmt;
    return this;
}

StmtContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StmtContext.prototype.constructor = StmtContext;

StmtContext.prototype.cond = function() {
    return this.getTypedRuleContext(CondContext,0);
};

StmtContext.prototype.loop = function() {
    return this.getTypedRuleContext(LoopContext,0);
};

StmtContext.prototype.return_stmt = function() {
    return this.getTypedRuleContext(Return_stmtContext,0);
};

StmtContext.prototype.SEMI = function() {
    return this.getToken(gramParser.SEMI, 0);
};

StmtContext.prototype.enterRule = function(listener) {
    if(listener instanceof gramListener ) {
        listener.enterStmt(this);
	}
};

StmtContext.prototype.exitRule = function(listener) {
    if(listener instanceof gramListener ) {
        listener.exitStmt(this);
	}
};




gramParser.StmtContext = StmtContext;

gramParser.prototype.stmt = function() {

    var localctx = new StmtContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, gramParser.RULE_stmt);
    try {
        this.state = 47;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case gramParser.IF:
            this.enterOuterAlt(localctx, 1);
            this.state = 42;
            this.cond();
            break;
        case gramParser.WHILE:
            this.enterOuterAlt(localctx, 2);
            this.state = 43;
            this.loop();
            break;
        case gramParser.RETURN:
            this.enterOuterAlt(localctx, 3);
            this.state = 44;
            this.return_stmt();
            this.state = 45;
            this.match(gramParser.SEMI);
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function CondContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = gramParser.RULE_cond;
    return this;
}

CondContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
CondContext.prototype.constructor = CondContext;

CondContext.prototype.IF = function() {
    return this.getToken(gramParser.IF, 0);
};

CondContext.prototype.LP = function() {
    return this.getToken(gramParser.LP, 0);
};

CondContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

CondContext.prototype.RP = function() {
    return this.getToken(gramParser.RP, 0);
};

CondContext.prototype.braceblock = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(BraceblockContext);
    } else {
        return this.getTypedRuleContext(BraceblockContext,i);
    }
};

CondContext.prototype.ELSE = function() {
    return this.getToken(gramParser.ELSE, 0);
};

CondContext.prototype.enterRule = function(listener) {
    if(listener instanceof gramListener ) {
        listener.enterCond(this);
	}
};

CondContext.prototype.exitRule = function(listener) {
    if(listener instanceof gramListener ) {
        listener.exitCond(this);
	}
};




gramParser.CondContext = CondContext;

gramParser.prototype.cond = function() {

    var localctx = new CondContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, gramParser.RULE_cond);
    try {
        this.state = 63;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,2,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 49;
            this.match(gramParser.IF);
            this.state = 50;
            this.match(gramParser.LP);
            this.state = 51;
            this.expr();
            this.state = 52;
            this.match(gramParser.RP);
            this.state = 53;
            this.braceblock();
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 55;
            this.match(gramParser.IF);
            this.state = 56;
            this.match(gramParser.LP);
            this.state = 57;
            this.expr();
            this.state = 58;
            this.match(gramParser.RP);
            this.state = 59;
            this.braceblock();
            this.state = 60;
            this.match(gramParser.ELSE);
            this.state = 61;
            this.braceblock();
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function LoopContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = gramParser.RULE_loop;
    return this;
}

LoopContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
LoopContext.prototype.constructor = LoopContext;

LoopContext.prototype.WHILE = function() {
    return this.getToken(gramParser.WHILE, 0);
};

LoopContext.prototype.LP = function() {
    return this.getToken(gramParser.LP, 0);
};

LoopContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

LoopContext.prototype.RP = function() {
    return this.getToken(gramParser.RP, 0);
};

LoopContext.prototype.braceblock = function() {
    return this.getTypedRuleContext(BraceblockContext,0);
};

LoopContext.prototype.enterRule = function(listener) {
    if(listener instanceof gramListener ) {
        listener.enterLoop(this);
	}
};

LoopContext.prototype.exitRule = function(listener) {
    if(listener instanceof gramListener ) {
        listener.exitLoop(this);
	}
};




gramParser.LoopContext = LoopContext;

gramParser.prototype.loop = function() {

    var localctx = new LoopContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, gramParser.RULE_loop);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 65;
        this.match(gramParser.WHILE);
        this.state = 66;
        this.match(gramParser.LP);
        this.state = 67;
        this.expr();
        this.state = 68;
        this.match(gramParser.RP);
        this.state = 69;
        this.braceblock();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function BraceblockContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = gramParser.RULE_braceblock;
    return this;
}

BraceblockContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
BraceblockContext.prototype.constructor = BraceblockContext;

BraceblockContext.prototype.LBR = function() {
    return this.getToken(gramParser.LBR, 0);
};

BraceblockContext.prototype.stmts = function() {
    return this.getTypedRuleContext(StmtsContext,0);
};

BraceblockContext.prototype.RBR = function() {
    return this.getToken(gramParser.RBR, 0);
};

BraceblockContext.prototype.enterRule = function(listener) {
    if(listener instanceof gramListener ) {
        listener.enterBraceblock(this);
	}
};

BraceblockContext.prototype.exitRule = function(listener) {
    if(listener instanceof gramListener ) {
        listener.exitBraceblock(this);
	}
};




gramParser.BraceblockContext = BraceblockContext;

gramParser.prototype.braceblock = function() {

    var localctx = new BraceblockContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, gramParser.RULE_braceblock);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 71;
        this.match(gramParser.LBR);
        this.state = 72;
        this.stmts();
        this.state = 73;
        this.match(gramParser.RBR);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function ExprContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = gramParser.RULE_expr;
    return this;
}

ExprContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ExprContext.prototype.constructor = ExprContext;

ExprContext.prototype.orexp = function() {
    return this.getTypedRuleContext(OrexpContext,0);
};

ExprContext.prototype.enterRule = function(listener) {
    if(listener instanceof gramListener ) {
        listener.enterExpr(this);
	}
};

ExprContext.prototype.exitRule = function(listener) {
    if(listener instanceof gramListener ) {
        listener.exitExpr(this);
	}
};




gramParser.ExprContext = ExprContext;

gramParser.prototype.expr = function() {

    var localctx = new ExprContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, gramParser.RULE_expr);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 75;
        this.orexp(0);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function OrexpContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = gramParser.RULE_orexp;
    return this;
}

OrexpContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
OrexpContext.prototype.constructor = OrexpContext;

OrexpContext.prototype.andexp = function() {
    return this.getTypedRuleContext(AndexpContext,0);
};

OrexpContext.prototype.orexp = function() {
    return this.getTypedRuleContext(OrexpContext,0);
};

OrexpContext.prototype.OR = function() {
    return this.getToken(gramParser.OR, 0);
};

OrexpContext.prototype.enterRule = function(listener) {
    if(listener instanceof gramListener ) {
        listener.enterOrexp(this);
	}
};

OrexpContext.prototype.exitRule = function(listener) {
    if(listener instanceof gramListener ) {
        listener.exitOrexp(this);
	}
};



gramParser.prototype.orexp = function(_p) {
	if(_p===undefined) {
	    _p = 0;
	}
    var _parentctx = this._ctx;
    var _parentState = this.state;
    var localctx = new OrexpContext(this, this._ctx, _parentState);
    var _prevctx = localctx;
    var _startState = 14;
    this.enterRecursionRule(localctx, 14, gramParser.RULE_orexp, _p);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 78;
        this.andexp(0);
        this._ctx.stop = this._input.LT(-1);
        this.state = 85;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,3,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                localctx = new OrexpContext(this, _parentctx, _parentState);
                this.pushNewRecursionContext(localctx, _startState, gramParser.RULE_orexp);
                this.state = 80;
                if (!( this.precpred(this._ctx, 2))) {
                    throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
                }
                this.state = 81;
                this.match(gramParser.OR);
                this.state = 82;
                this.andexp(0); 
            }
            this.state = 87;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,3,this._ctx);
        }

    } catch( error) {
        if(error instanceof antlr4.error.RecognitionException) {
	        localctx.exception = error;
	        this._errHandler.reportError(this, error);
	        this._errHandler.recover(this, error);
	    } else {
	    	throw error;
	    }
    } finally {
        this.unrollRecursionContexts(_parentctx)
    }
    return localctx;
};


function AndexpContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = gramParser.RULE_andexp;
    return this;
}

AndexpContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AndexpContext.prototype.constructor = AndexpContext;

AndexpContext.prototype.notexp = function() {
    return this.getTypedRuleContext(NotexpContext,0);
};

AndexpContext.prototype.andexp = function() {
    return this.getTypedRuleContext(AndexpContext,0);
};

AndexpContext.prototype.AND = function() {
    return this.getToken(gramParser.AND, 0);
};

AndexpContext.prototype.enterRule = function(listener) {
    if(listener instanceof gramListener ) {
        listener.enterAndexp(this);
	}
};

AndexpContext.prototype.exitRule = function(listener) {
    if(listener instanceof gramListener ) {
        listener.exitAndexp(this);
	}
};



gramParser.prototype.andexp = function(_p) {
	if(_p===undefined) {
	    _p = 0;
	}
    var _parentctx = this._ctx;
    var _parentState = this.state;
    var localctx = new AndexpContext(this, this._ctx, _parentState);
    var _prevctx = localctx;
    var _startState = 16;
    this.enterRecursionRule(localctx, 16, gramParser.RULE_andexp, _p);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 89;
        this.notexp();
        this._ctx.stop = this._input.LT(-1);
        this.state = 96;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,4,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                localctx = new AndexpContext(this, _parentctx, _parentState);
                this.pushNewRecursionContext(localctx, _startState, gramParser.RULE_andexp);
                this.state = 91;
                if (!( this.precpred(this._ctx, 2))) {
                    throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
                }
                this.state = 92;
                this.match(gramParser.AND);
                this.state = 93;
                this.notexp(); 
            }
            this.state = 98;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,4,this._ctx);
        }

    } catch( error) {
        if(error instanceof antlr4.error.RecognitionException) {
	        localctx.exception = error;
	        this._errHandler.reportError(this, error);
	        this._errHandler.recover(this, error);
	    } else {
	    	throw error;
	    }
    } finally {
        this.unrollRecursionContexts(_parentctx)
    }
    return localctx;
};


function NotexpContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = gramParser.RULE_notexp;
    return this;
}

NotexpContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
NotexpContext.prototype.constructor = NotexpContext;

NotexpContext.prototype.NOT = function() {
    return this.getToken(gramParser.NOT, 0);
};

NotexpContext.prototype.notexp = function() {
    return this.getTypedRuleContext(NotexpContext,0);
};

NotexpContext.prototype.rel = function() {
    return this.getTypedRuleContext(RelContext,0);
};

NotexpContext.prototype.enterRule = function(listener) {
    if(listener instanceof gramListener ) {
        listener.enterNotexp(this);
	}
};

NotexpContext.prototype.exitRule = function(listener) {
    if(listener instanceof gramListener ) {
        listener.exitNotexp(this);
	}
};




gramParser.NotexpContext = NotexpContext;

gramParser.prototype.notexp = function() {

    var localctx = new NotexpContext(this, this._ctx, this.state);
    this.enterRule(localctx, 18, gramParser.RULE_notexp);
    try {
        this.state = 102;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case gramParser.NOT:
            this.enterOuterAlt(localctx, 1);
            this.state = 99;
            this.match(gramParser.NOT);
            this.state = 100;
            this.notexp();
            break;
        case gramParser.LP:
        case gramParser.FPNUM:
        case gramParser.NUM:
        case gramParser.MINUS:
            this.enterOuterAlt(localctx, 2);
            this.state = 101;
            this.rel();
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function RelContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = gramParser.RULE_rel;
    return this;
}

RelContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
RelContext.prototype.constructor = RelContext;

RelContext.prototype.sum = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(SumContext);
    } else {
        return this.getTypedRuleContext(SumContext,i);
    }
};

RelContext.prototype.RELOP = function() {
    return this.getToken(gramParser.RELOP, 0);
};

RelContext.prototype.enterRule = function(listener) {
    if(listener instanceof gramListener ) {
        listener.enterRel(this);
	}
};

RelContext.prototype.exitRule = function(listener) {
    if(listener instanceof gramListener ) {
        listener.exitRel(this);
	}
};




gramParser.RelContext = RelContext;

gramParser.prototype.rel = function() {

    var localctx = new RelContext(this, this._ctx, this.state);
    this.enterRule(localctx, 20, gramParser.RULE_rel);
    try {
        this.state = 109;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,6,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 104;
            this.sum(0);
            this.state = 105;
            this.match(gramParser.RELOP);
            this.state = 106;
            this.sum(0);
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 108;
            this.sum(0);
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function SumContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = gramParser.RULE_sum;
    return this;
}

SumContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
SumContext.prototype.constructor = SumContext;

SumContext.prototype.term = function() {
    return this.getTypedRuleContext(TermContext,0);
};

SumContext.prototype.sum = function() {
    return this.getTypedRuleContext(SumContext,0);
};

SumContext.prototype.PLUS = function() {
    return this.getToken(gramParser.PLUS, 0);
};

SumContext.prototype.MINUS = function() {
    return this.getToken(gramParser.MINUS, 0);
};

SumContext.prototype.enterRule = function(listener) {
    if(listener instanceof gramListener ) {
        listener.enterSum(this);
	}
};

SumContext.prototype.exitRule = function(listener) {
    if(listener instanceof gramListener ) {
        listener.exitSum(this);
	}
};



gramParser.prototype.sum = function(_p) {
	if(_p===undefined) {
	    _p = 0;
	}
    var _parentctx = this._ctx;
    var _parentState = this.state;
    var localctx = new SumContext(this, this._ctx, _parentState);
    var _prevctx = localctx;
    var _startState = 22;
    this.enterRecursionRule(localctx, 22, gramParser.RULE_sum, _p);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 112;
        this.term(0);
        this._ctx.stop = this._input.LT(-1);
        this.state = 122;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,8,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                this.state = 120;
                this._errHandler.sync(this);
                var la_ = this._interp.adaptivePredict(this._input,7,this._ctx);
                switch(la_) {
                case 1:
                    localctx = new SumContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, gramParser.RULE_sum);
                    this.state = 114;
                    if (!( this.precpred(this._ctx, 3))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
                    }
                    this.state = 115;
                    this.match(gramParser.PLUS);
                    this.state = 116;
                    this.term(0);
                    break;

                case 2:
                    localctx = new SumContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, gramParser.RULE_sum);
                    this.state = 117;
                    if (!( this.precpred(this._ctx, 2))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
                    }
                    this.state = 118;
                    this.match(gramParser.MINUS);
                    this.state = 119;
                    this.term(0);
                    break;

                } 
            }
            this.state = 124;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,8,this._ctx);
        }

    } catch( error) {
        if(error instanceof antlr4.error.RecognitionException) {
	        localctx.exception = error;
	        this._errHandler.reportError(this, error);
	        this._errHandler.recover(this, error);
	    } else {
	    	throw error;
	    }
    } finally {
        this.unrollRecursionContexts(_parentctx)
    }
    return localctx;
};


function TermContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = gramParser.RULE_term;
    return this;
}

TermContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
TermContext.prototype.constructor = TermContext;

TermContext.prototype.neg = function() {
    return this.getTypedRuleContext(NegContext,0);
};

TermContext.prototype.term = function() {
    return this.getTypedRuleContext(TermContext,0);
};

TermContext.prototype.MULOP = function() {
    return this.getToken(gramParser.MULOP, 0);
};

TermContext.prototype.enterRule = function(listener) {
    if(listener instanceof gramListener ) {
        listener.enterTerm(this);
	}
};

TermContext.prototype.exitRule = function(listener) {
    if(listener instanceof gramListener ) {
        listener.exitTerm(this);
	}
};



gramParser.prototype.term = function(_p) {
	if(_p===undefined) {
	    _p = 0;
	}
    var _parentctx = this._ctx;
    var _parentState = this.state;
    var localctx = new TermContext(this, this._ctx, _parentState);
    var _prevctx = localctx;
    var _startState = 24;
    this.enterRecursionRule(localctx, 24, gramParser.RULE_term, _p);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 126;
        this.neg();
        this._ctx.stop = this._input.LT(-1);
        this.state = 133;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,9,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                localctx = new TermContext(this, _parentctx, _parentState);
                this.pushNewRecursionContext(localctx, _startState, gramParser.RULE_term);
                this.state = 128;
                if (!( this.precpred(this._ctx, 2))) {
                    throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
                }
                this.state = 129;
                this.match(gramParser.MULOP);
                this.state = 130;
                this.neg(); 
            }
            this.state = 135;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,9,this._ctx);
        }

    } catch( error) {
        if(error instanceof antlr4.error.RecognitionException) {
	        localctx.exception = error;
	        this._errHandler.reportError(this, error);
	        this._errHandler.recover(this, error);
	    } else {
	    	throw error;
	    }
    } finally {
        this.unrollRecursionContexts(_parentctx)
    }
    return localctx;
};


function NegContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = gramParser.RULE_neg;
    return this;
}

NegContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
NegContext.prototype.constructor = NegContext;

NegContext.prototype.MINUS = function() {
    return this.getToken(gramParser.MINUS, 0);
};

NegContext.prototype.neg = function() {
    return this.getTypedRuleContext(NegContext,0);
};

NegContext.prototype.cast = function() {
    return this.getTypedRuleContext(CastContext,0);
};

NegContext.prototype.enterRule = function(listener) {
    if(listener instanceof gramListener ) {
        listener.enterNeg(this);
	}
};

NegContext.prototype.exitRule = function(listener) {
    if(listener instanceof gramListener ) {
        listener.exitNeg(this);
	}
};




gramParser.NegContext = NegContext;

gramParser.prototype.neg = function() {

    var localctx = new NegContext(this, this._ctx, this.state);
    this.enterRule(localctx, 26, gramParser.RULE_neg);
    try {
        this.state = 139;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case gramParser.MINUS:
            this.enterOuterAlt(localctx, 1);
            this.state = 136;
            this.match(gramParser.MINUS);
            this.state = 137;
            this.neg();
            break;
        case gramParser.LP:
        case gramParser.FPNUM:
        case gramParser.NUM:
            this.enterOuterAlt(localctx, 2);
            this.state = 138;
            this.cast();
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function CastContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = gramParser.RULE_cast;
    return this;
}

CastContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
CastContext.prototype.constructor = CastContext;

CastContext.prototype.LP = function() {
    return this.getToken(gramParser.LP, 0);
};

CastContext.prototype.TYPE = function() {
    return this.getToken(gramParser.TYPE, 0);
};

CastContext.prototype.RP = function() {
    return this.getToken(gramParser.RP, 0);
};

CastContext.prototype.cast = function() {
    return this.getTypedRuleContext(CastContext,0);
};

CastContext.prototype.factor = function() {
    return this.getTypedRuleContext(FactorContext,0);
};

CastContext.prototype.enterRule = function(listener) {
    if(listener instanceof gramListener ) {
        listener.enterCast(this);
	}
};

CastContext.prototype.exitRule = function(listener) {
    if(listener instanceof gramListener ) {
        listener.exitCast(this);
	}
};




gramParser.CastContext = CastContext;

gramParser.prototype.cast = function() {

    var localctx = new CastContext(this, this._ctx, this.state);
    this.enterRule(localctx, 28, gramParser.RULE_cast);
    try {
        this.state = 146;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,11,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 141;
            this.match(gramParser.LP);
            this.state = 142;
            this.match(gramParser.TYPE);
            this.state = 143;
            this.match(gramParser.RP);
            this.state = 144;
            this.cast();
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 145;
            this.factor();
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function FactorContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = gramParser.RULE_factor;
    return this;
}

FactorContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FactorContext.prototype.constructor = FactorContext;

FactorContext.prototype.NUM = function() {
    return this.getToken(gramParser.NUM, 0);
};

FactorContext.prototype.FPNUM = function() {
    return this.getToken(gramParser.FPNUM, 0);
};

FactorContext.prototype.LP = function() {
    return this.getToken(gramParser.LP, 0);
};

FactorContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

FactorContext.prototype.RP = function() {
    return this.getToken(gramParser.RP, 0);
};

FactorContext.prototype.enterRule = function(listener) {
    if(listener instanceof gramListener ) {
        listener.enterFactor(this);
	}
};

FactorContext.prototype.exitRule = function(listener) {
    if(listener instanceof gramListener ) {
        listener.exitFactor(this);
	}
};




gramParser.FactorContext = FactorContext;

gramParser.prototype.factor = function() {

    var localctx = new FactorContext(this, this._ctx, this.state);
    this.enterRule(localctx, 30, gramParser.RULE_factor);
    try {
        this.state = 154;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case gramParser.NUM:
            this.enterOuterAlt(localctx, 1);
            this.state = 148;
            this.match(gramParser.NUM);
            break;
        case gramParser.FPNUM:
            this.enterOuterAlt(localctx, 2);
            this.state = 149;
            this.match(gramParser.FPNUM);
            break;
        case gramParser.LP:
            this.enterOuterAlt(localctx, 3);
            this.state = 150;
            this.match(gramParser.LP);
            this.state = 151;
            this.expr();
            this.state = 152;
            this.match(gramParser.RP);
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function Return_stmtContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = gramParser.RULE_return_stmt;
    return this;
}

Return_stmtContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Return_stmtContext.prototype.constructor = Return_stmtContext;

Return_stmtContext.prototype.RETURN = function() {
    return this.getToken(gramParser.RETURN, 0);
};

Return_stmtContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

Return_stmtContext.prototype.enterRule = function(listener) {
    if(listener instanceof gramListener ) {
        listener.enterReturn_stmt(this);
	}
};

Return_stmtContext.prototype.exitRule = function(listener) {
    if(listener instanceof gramListener ) {
        listener.exitReturn_stmt(this);
	}
};




gramParser.Return_stmtContext = Return_stmtContext;

gramParser.prototype.return_stmt = function() {

    var localctx = new Return_stmtContext(this, this._ctx, this.state);
    this.enterRule(localctx, 32, gramParser.RULE_return_stmt);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 156;
        this.match(gramParser.RETURN);
        this.state = 157;
        this.expr();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


gramParser.prototype.sempred = function(localctx, ruleIndex, predIndex) {
	switch(ruleIndex) {
	case 7:
			return this.orexp_sempred(localctx, predIndex);
	case 8:
			return this.andexp_sempred(localctx, predIndex);
	case 11:
			return this.sum_sempred(localctx, predIndex);
	case 12:
			return this.term_sempred(localctx, predIndex);
    default:
        throw "No predicate with index:" + ruleIndex;
   }
};

gramParser.prototype.orexp_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 0:
			return this.precpred(this._ctx, 2);
		default:
			throw "No predicate with index:" + predIndex;
	}
};

gramParser.prototype.andexp_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 1:
			return this.precpred(this._ctx, 2);
		default:
			throw "No predicate with index:" + predIndex;
	}
};

gramParser.prototype.sum_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 2:
			return this.precpred(this._ctx, 3);
		case 3:
			return this.precpred(this._ctx, 2);
		default:
			throw "No predicate with index:" + predIndex;
	}
};

gramParser.prototype.term_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 4:
			return this.precpred(this._ctx, 2);
		default:
			throw "No predicate with index:" + predIndex;
	}
};


exports.gramParser = gramParser;
