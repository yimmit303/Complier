"use strict";
exports.__esModule = true;
var Grammar = /** @class */ (function () {
    function Grammar(input) {
        // console.log(input);
        this.mInput = input;
        this.mProductions = new Map();
        this.mSymbols = new Set();
        this.mNonTerminatorSymbols = new Array();
        var doing_nonterminators = false; // This variable keeps track of which side of the single newline character we are on
        var mUsedSymbols = new Set();
        this.mProductions.set("WHITESPACE", new RegExp(/(\s|\n)+/, 'gy'));
        // this.mProductions.set("COMMENT", new RegExp(/\/\*(.|\n)*?\*\//, 'gy'));
        var expressions = input.split("\n");
        // Looping through all of the Productions that are provided in the grammar text
        for (var i = 0; i < expressions.length; i += 1) {
            // Detecting the single line newline character that separates stuff
            if (expressions[i] == "") {
                doing_nonterminators = true;
                continue;
            }
            var expression = expressions[i].split(" -> ");
            if (expression.length != 2) {
                throw new Error("Production: " + expression + " on Line: " + i + " is invalid");
            }
            // Ensuring that we can't have doubles of any productions before the single newline.
            if (this.mProductions.has(expression[0]) && doing_nonterminators == false) {
                throw new Error("Grammar has terminator production" + expression[0] + " listed more than once.");
            }
            // Allowing for the easy concatonation of regexes
            else if (this.mProductions.has(expression[0]) && doing_nonterminators == true) {
                var tmprex = this.get_rex(expression[0]).source;
                tmprex = (tmprex + " | " + expression[1]).replace("lambda", "");
                this.mProductions.set(expression[0], new RegExp(tmprex));
            }
            // Adding new productions
            else {
                this.mProductions.set(expression[0], new RegExp(expression[1].replace("lambda", "")));
                this.mSymbols.add(expression[0]);
                if (doing_nonterminators) {
                    this.mNonTerminatorSymbols.push(expression[0]);
                }
            }
        }
        // Add all of the used productions into the set of all used productions
        for (var i = 0; i < this.mNonTerminatorSymbols.length; i++) {
            var rex = this.get_rex(this.mNonTerminatorSymbols[i]).source;
            var tmp = rex.split(" | ");
            for (var j = 0; j < tmp.length; j++) {
                var tmpp = tmp[j].split(" ");
                for (var k = 0; k < tmpp.length; k++) {
                    mUsedSymbols.add(tmpp[k]);
                }
            }
        }
        // Checking to see if the grammar is using undefined symbols
        var used = Array.from(mUsedSymbols.values());
        var syms = Array.from(this.mSymbols);
        for (var i = 0; i < used.length; i++) {
            if (!this.mSymbols.has(used[i]) && used[i] != "") {
                throw new Error("Grammar has undefined symbols. Symbol: " + used[i] + " is undefined");
            }
        }
        //Checking to see if the grammar has unused symbols
        for (var i = 0; i < syms.length; i++) {
            if (!mUsedSymbols.has(syms[i])) {
                // throw new Error("Grammar has unused symbols. Symbol: " + syms[i]);
            }
        }
        // console.log(this.mInput);
        // console.log(this.mProductions);
        // console.log(this.mSymbols);
        // console.log("Nonterminators: ", this.mNonTerminatorSymbols);
    }
    Grammar.prototype.contains = function (symbol) {
        return this.mProductions.has(symbol);
    };
    Grammar.prototype.get_rex = function (symbol) {
        return this.mProductions.get(symbol);
    };
    Grammar.prototype.getNullable = function () {
        var nullable = new Set();
        nullable.add("");
        var stable = false;
        while (!stable) {
            stable = true;
            // console.log(this.mNonTerminatorSymbols);
            for (var _i = 0, _a = this.mNonTerminatorSymbols; _i < _a.length; _i++) {
                var nonterminal = _a[_i];
                if (!nullable.has(nonterminal)) {
                    var production_list = this.mProductions.get(nonterminal).source.split("|");
                    // console.log("Nonterminal: ", nonterminal, "Prodcution list: ", production_list);
                    for (var _b = 0, production_list_1 = production_list; _b < production_list_1.length; _b++) {
                        var production = production_list_1[_b];
                        production = production.trim();
                        // console.log(production);
                        var symbol_list = production.split(" ");
                        // console.log("Symbol_list", symbol_list);
                        var allNullable = symbol_list.every(function (sym) {
                            return nullable.has(sym);
                        });
                        if (allNullable) {
                            if (!nullable.has(nonterminal)) {
                                stable = false;
                                nullable.add(nonterminal); // = union( nullable , N )
                            }
                        }
                    }
                }
            }
        }
        nullable["delete"]("");
        return nullable;
    };
    return Grammar;
}());
exports.Grammar = Grammar;
var Production = /** @class */ (function () {
    function Production(symbol, regex) {
        this.mSymbol = symbol;
        this.mRegex = regex;
    }
    return Production;
}());
