"use strict";
exports.__esModule = true;
var Token_1 = require("./Token");
var Tokenizer = /** @class */ (function () {
    function Tokenizer(grammar) {
        this.mIdx = 0;
        this.mCurrentLine = 1;
        this.mGrammar = null;
        this.mGrammar = grammar;
        this.mCurrentLine = 1;
        this.mIdx = 0;
    }
    Tokenizer.prototype.setInput = function (inputData) {
        this.mInputData = inputData;
    };
    Tokenizer.prototype.next = function () {
        if (this.mIdx >= this.mInputData.length) {
            //special "end of file" metatoken
            var eof = new Token_1.Token("$", undefined, this.mCurrentLine);
            this.mCurrentLine = 1;
            this.mIdx = 0;
            return eof;
        }
        for (var _i = 0, _a = Array.from(this.mGrammar.mProductions.keys()); _i < _a.length; _i++) {
            var sym = _a[_i];
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
                    return tok;
                }
                else {
                    //skip whitespace and get next real token
                    this.mCurrentLine += (m[0].match(/\n/g) || []).length;
                    return this.next();
                }
            }
        }
        //no match; syntax error
        throw new Error("Syntax Error");
    };
    return Tokenizer;
}());
exports.Tokenizer = Tokenizer;
