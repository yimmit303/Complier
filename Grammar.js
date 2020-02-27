"use strict";
exports.__esModule = true;
var Grammar = /** @class */ (function () {
    function Grammar(grammar) {
        this.mTerminalList = [];
        this.mTerminalList.push(new Terminal("WHITESPACE", new RegExp(/(\s|\n)+/gy)));
        this.mTerminalList.push(new Terminal("COMMENT", new RegExp(/\/\*(.|\n)*?\*\//gy)));
        var expressions = grammar.split("\n");
        for (var i = 0; i < expressions.length; i++) {
            if (expressions[i].length > 0) {
                var expression = expressions[i].split("->");
                var symbol = expression[0].trim();
                var regex = expression[1].trim();
                if (expression.length != 2) {
                    throw new Error("The production is the wrong length");
                }
                for (var j = 0; j < this.mTerminalList.length; j++) {
                    if (this.mTerminalList[i].mSymbol == expression[0]) {
                        throw new Error("Duplicate Symbol");
                    }
                }
                this.mTerminalList.push(new Terminal(symbol, new RegExp(regex, 'gy')));
            }
        }
    }
    return Grammar;
}());
exports.Grammar = Grammar;
var Terminal = /** @class */ (function () {
    function Terminal(symbol, regex) {
        this.mSymbol = symbol;
        this.mRegex = regex;
    }
    return Terminal;
}());
