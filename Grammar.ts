

export class Grammar
{
    mProductions: Map<string, RegExp>;
    mSymbols: Set<string>;
    mInput: string;

    constructor(input: string) 
    {
        // console.log(input);
        this.mInput = input;
        this.mProductions = new Map<string, RegExp>();
        this.mSymbols = new Set<string>();

        var next = false; // This variable keeps track of which side of the single newline character we are on
        var mUsedSymbols: Set<string> = new Set<string>();
        var after_next: Array<string> = new Array<string>();
        
        this.mProductions.set("WHITESPACE", new RegExp(/(\s|\n)+/, 'gy'));
        this.mProductions.set("COMMENT", new RegExp(/\/\*(.|\n)*?\*\//, 'gy'));

        var expressions: string[] = input.split("\n");
        // Looping through all of the Productions that are provided in the grammar text
        for (var i = 0; i < expressions.length; i += 1)
        {
            // Detecting the single line newline character that separates stuff
            if (expressions[i] == "")
            {
                next = true;
                continue;
            }
            let expression: Array<string> = expressions[i].split(" -> ");
            if (expression.length != 2)
            {
                throw new Error("Production: " + expression + " on Line: " + i + " is invalid");
            }
            // Ensuring that we can't have doubles of any productions before the single newline.
            if (this.mProductions.has(expression[0]) && next == false)
            {
                throw new Error("Grammar has " + expression[0] + " listed more than once.");
            }
            // Allowing for the easy concatonation of regexes
            else if (this.mProductions.has(expression[0]) && next == true)
            {
                var tmprex = this.get_rex(expression[0]).source;
                tmprex = tmprex + " | " + expression[1];
                this.mProductions.set(expression[0], new RegExp(tmprex));
            }
            // Adding new productions
            else
            {
                this.mProductions.set(expression[0], new RegExp(expression[1]));
                this.mSymbols.add(expression[0]);
                if (next) 
                { 
                    after_next.push(expression[0]); 
                }
            }
        }

        // Add all of the used productions into the set of all used productions
        for (var i = 0; i < after_next.length; i++)
        {
            var rex: string = this.get_rex(after_next[i]).source;
            var tmp = rex.split(" | ");
            for (var j = 0; j < tmp.length; j++)
            {
                var tmpp = tmp[j].split(" ");
                for (var k = 0; k < tmpp.length; k++)
                {
                    mUsedSymbols.add(tmpp[k]);
                }
            }
        }

        // Checking to see if the grammar is using undefined symbols
        var used = Array.from(mUsedSymbols.values());
        var syms = Array.from(this.mSymbols);
        for (var i = 0; i < used.length; i++)
        {
            if (!this.mSymbols.has(used[i]) && used[i] != "")
            {
                throw new Error("Grammar has undefined symbols");
            }
        }

        //Checking to see if the grammar has unused symbols
        for (var i = 0; i < syms.length; i++)
        {
            if (!mUsedSymbols.has(syms[i]))
            {
                throw new Error("Grammar has unused symbols");
            }
        }
    }

    contains(symbol: string) 
    { 
        return this.mProductions.has(symbol); 
    }

    get_rex(symbol: string) 
    { 
        return this.mProductions.get(symbol);
    }
}

class Production
{
    mSymbol: string;
    mRegex: RegExp;

    constructor(symbol: string, regex: RegExp)
    {
        this.mSymbol = symbol;
        this.mRegex = regex;
    }
}