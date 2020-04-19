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
        var e_1, _a, e_2, _b;
        var nullable = new Set();
        nullable.add("");
        var stable = false;
        while (!stable) {
            stable = true;
            try {
                // console.log(this.mNonTerminatorSymbols);
                for (var _c = (e_1 = void 0, __values(this.mNonTerminatorSymbols)), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var nonterminal = _d.value;
                    if (!nullable.has(nonterminal)) {
                        var production_list = this.mProductions.get(nonterminal).source.split("|");
                        try {
                            // console.log("Nonterminal: ", nonterminal, "Prodcution list: ", production_list);
                            for (var production_list_1 = (e_2 = void 0, __values(production_list)), production_list_1_1 = production_list_1.next(); !production_list_1_1.done; production_list_1_1 = production_list_1.next()) {
                                var production = production_list_1_1.value;
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
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (production_list_1_1 && !production_list_1_1.done && (_b = production_list_1["return"])) _b.call(production_list_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c["return"])) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        nullable["delete"]("");
        return nullable;
    };
    Grammar.prototype.getFirst = function () {
        var e_3, _a, e_4, _b, e_5, _c, e_6, _d;
        var first = new Map();
        try {
            for (var _e = __values(this.mSymbols), _f = _e.next(); !_f.done; _f = _e.next()) {
                var symbol = _f.value;
                if (!this.mNonTerminatorSymbols.includes(symbol)) {
                    first.set(symbol, new Set([symbol]));
                }
                else {
                    first.set(symbol, new Set());
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_a = _e["return"])) _a.call(_e);
            }
            finally { if (e_3) throw e_3.error; }
        }
        var nullable = this.getNullable();
        var stable = false;
        while (!stable) {
            stable = true;
            try {
                for (var _g = (e_4 = void 0, __values(this.mNonTerminatorSymbols)), _h = _g.next(); !_h.done; _h = _g.next()) {
                    var nonterminal = _h.value;
                    var production_list = this.mProductions.get(nonterminal).source.split("|");
                    try {
                        // console.log("Nonterminal: ", nonterminal, "Prodcution list: ", production_list);
                        for (var production_list_2 = (e_5 = void 0, __values(production_list)), production_list_2_1 = production_list_2.next(); !production_list_2_1.done; production_list_2_1 = production_list_2.next()) {
                            var production = production_list_2_1.value;
                            production = production.trim();
                            // console.log(production);
                            var symbol_list = production.split(" ");
                            try {
                                // console.log("Symbol_list", symbol_list);
                                for (var symbol_list_1 = (e_6 = void 0, __values(symbol_list)), symbol_list_1_1 = symbol_list_1.next(); !symbol_list_1_1.done; symbol_list_1_1 = symbol_list_1.next()) {
                                    var symbol = symbol_list_1_1.value;
                                    if (symbol.length > 0) {
                                        // console.log(nonterminal, symbol);
                                        var pre_list = new Set();
                                        first.get(nonterminal).forEach(pre_list.add, pre_list);
                                        // console.log("B: ", first.get(nonterminal), pre_list);
                                        first.set(nonterminal, set_concatnation(first.get(nonterminal), first.get(symbol)));
                                        // console.log("A: ", first.get(nonterminal), pre_list);
                                        // console.log(set_compare(first.get(nonterminal), pre_list));
                                        if (set_compare(first.get(nonterminal), pre_list) == false) {
                                            stable = false;
                                        }
                                        if (!nullable.has(symbol)) {
                                            break;
                                        }
                                    }
                                }
                            }
                            catch (e_6_1) { e_6 = { error: e_6_1 }; }
                            finally {
                                try {
                                    if (symbol_list_1_1 && !symbol_list_1_1.done && (_d = symbol_list_1["return"])) _d.call(symbol_list_1);
                                }
                                finally { if (e_6) throw e_6.error; }
                            }
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (production_list_2_1 && !production_list_2_1.done && (_c = production_list_2["return"])) _c.call(production_list_2);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_h && !_h.done && (_b = _g["return"])) _b.call(_g);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
        return first;
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
function set_concatnation(set1, set2) {
    var e_7, _a;
    try {
        for (var set2_1 = __values(set2), set2_1_1 = set2_1.next(); !set2_1_1.done; set2_1_1 = set2_1.next()) {
            var set2_string = set2_1_1.value;
            set1.add(set2_string);
        }
    }
    catch (e_7_1) { e_7 = { error: e_7_1 }; }
    finally {
        try {
            if (set2_1_1 && !set2_1_1.done && (_a = set2_1["return"])) _a.call(set2_1);
        }
        finally { if (e_7) throw e_7.error; }
    }
    return set1;
}
function set_compare(set1, set2) {
    if (set1.size != set2.size) {
        return false;
    }
    for (var i = 0; i < set1.size; i++) {
        if (Array.from(set1)[i] != Array.from(set2)[i]) {
            return false;
        }
    }
    return true;
}
