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
var Token_1 = require("./Token");
var Tokenizer = /** @class */ (function () {
    function Tokenizer(grammar) {
        this.mIdx = 0;
        this.mCurrentLine = 1;
        this.mGrammar = null;
        this.mPreviousTokens = [];
        this.mAtEnd = false;
        this.mGrammar = grammar;
        this.mCurrentLine = 1;
        this.mIdx = 0;
        this.mPreviousTokens = [];
        this.mAtEnd = false;
    }
    Tokenizer.prototype.setInput = function (inputData) {
        this.mInputData = inputData;
        this.mCurrentLine = 1;
        this.mIdx = 0;
        this.mPreviousTokens = [];
        this.mAtEnd = false;
    };
    Tokenizer.prototype.next = function () {
        var e_1, _a;
        // console.log("T.next() call at idx ", this.mIdx)
        if (this.mIdx >= this.mInputData.length) {
            //special "end of file" metatoken
            var eof = new Token_1.Token("$", undefined, this.mCurrentLine);
            this.mAtEnd = true;
            return eof;
        }
        try {
            for (var _b = __values(Array.from(this.mGrammar.mProductions.keys())), _c = _b.next(); !_c.done; _c = _b.next()) {
                var sym = _c.value;
                var rex = this.mGrammar.mProductions.get(sym); //RegExp
                rex.lastIndex = this.mIdx; //tell where to start searching
                var m = rex.exec(this.mInputData); //do the search
                if (m) {
                    //m[0] contains matched text as string
                    var lexeme = m[0];
                    this.mIdx = rex.lastIndex;
                    if (sym !== "WHITESPACE" && sym !== "COMMENT") {
                        var tok = new Token_1.Token(sym, lexeme, this.mCurrentLine);
                        this.mCurrentLine += (m[0].match(/\n/g) || []).length;
                        if (this.mPreviousTokens.push(tok) == 3) {
                            this.mPreviousTokens.shift();
                        }
                        // console.log("\t", tok)
                        return tok;
                    }
                    else {
                        //skip whitespace and get next real token
                        this.mCurrentLine += (m[0].match(/\n/g) || []).length;
                        return this.next();
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        //no match; syntax error
        throw new Error("Syntax Error");
    };
    Tokenizer.prototype.expect = function (expected) {
        var actual_token = this.next();
        if (actual_token.sym != expected) {
            var error_string = "ERROR - Expected: " + expected + " - Got: " + actual_token.sym + " at line: " + actual_token.line;
            throw new Error(error_string);
        }
        return actual_token;
    };
    Tokenizer.prototype.previous = function () {
        return this.mPreviousTokens[0];
    };
    Tokenizer.prototype.atEnd = function () {
        return this.mAtEnd;
    };
    Tokenizer.prototype.peek = function () {
        var previous_idx = this.mIdx;
        var previous_line = this.mCurrentLine;
        var peeked_token = this.next();
        this.mIdx = previous_idx;
        this.mCurrentLine = previous_line;
        return peeked_token;
    };
    Tokenizer.prototype.peek2 = function () {
        var previous_idx = this.mIdx;
        var previous_line = this.mCurrentLine;
        var peeked_token = this.next();
        peeked_token = this.next();
        this.mIdx = previous_idx;
        this.mCurrentLine = previous_line;
        return peeked_token;
    };
    return Tokenizer;
}());
exports.Tokenizer = Tokenizer;
