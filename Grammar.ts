

export class Grammar
{
    mProductions: Map<string, RegExp>;
    mSymbols: Set<string>;
    mInput: string;
    mNonTerminatorSymbols: Array<string>;

    constructor(input: string) 
    {
        // console.log(input);
        this.mInput = input;
        this.mProductions = new Map<string, RegExp>();
        this.mSymbols = new Set<string>();
        this.mNonTerminatorSymbols = new Array<string>();

        var doing_nonterminators = false; // This variable keeps track of which side of the single newline character we are on
        var mUsedSymbols: Set<string> = new Set<string>();
        
        this.mProductions.set("WHITESPACE", new RegExp(/(\s|\n)+/, 'gy'));
        // this.mProductions.set("COMMENT", new RegExp(/\/\*(.|\n)*?\*\//, 'gy'));

        var expressions: string[] = input.split("\n");
        // Looping through all of the Productions that are provided in the grammar text
        for (var i = 0; i < expressions.length; i += 1)
        {
            // Detecting the single line newline character that separates stuff
            if (expressions[i] == "")
            {
                doing_nonterminators = true;
                continue;
            }
            let expression: Array<string> = expressions[i].split(" -> ");
            if (expression.length != 2)
            {
                throw new Error("Production: " + expression + " on Line: " + i + " is invalid");
            }
            // Ensuring that we can't have doubles of any productions before the single newline.
            if (this.mProductions.has(expression[0]) && doing_nonterminators == false)
            {
                throw new Error("Grammar has terminator production" + expression[0] + " listed more than once.");
            }
            // Allowing for the easy concatonation of regexes
            else if (this.mProductions.has(expression[0]) && doing_nonterminators == true)
            {
                var tmprex = this.get_rex(expression[0]).source;
                tmprex = (tmprex + " | " + expression[1]).replace("lambda", "");
                this.mProductions.set(expression[0], new RegExp(tmprex));
            }
            // Adding new productions
            else
            {
                this.mProductions.set(expression[0], new RegExp(expression[1].replace("lambda", "")));
                this.mSymbols.add(expression[0]);
                if (doing_nonterminators) 
                { 
                    this.mNonTerminatorSymbols.push(expression[0]); 
                }
            }
        }

        // Add all of the used productions into the set of all used productions
        for (var i = 0; i < this.mNonTerminatorSymbols.length; i++)
        {
            var rex: string = this.get_rex(this.mNonTerminatorSymbols[i]).source;
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
                throw new Error("Grammar has undefined symbols. Symbol: " + used[i] + " is undefined");
            }
        }

        //Checking to see if the grammar has unused symbols
        for (var i = 0; i < syms.length; i++)
        {
            if (!mUsedSymbols.has(syms[i]))
            {
                // throw new Error("Grammar has unused symbols. Symbol: " + syms[i]);
            }
        }
        // console.log(this.mInput);
        // console.log(this.mProductions);
        // console.log(this.mSymbols);
        // console.log("Nonterminators: ", this.mNonTerminatorSymbols);
    }

    contains(symbol: string) 
    { 
        return this.mProductions.has(symbol); 
    }

    get_rex(symbol: string) 
    { 
        return this.mProductions.get(symbol);
    }

    getNullable(): Set<string>
    {
        let nullable = new Set<string>();
        nullable.add("");
        let stable = false;
        while(!stable)
        {
            stable = true;
            // console.log(this.mNonTerminatorSymbols);

            for (let nonterminal of this.mNonTerminatorSymbols)
            {
                if (!nullable.has(nonterminal))
                {
                    let production_list = this.mProductions.get(nonterminal).source.split("|");
                    // console.log("Nonterminal: ", nonterminal, "Prodcution list: ", production_list);
                    for (let production of production_list)
                    {
                        production = production.trim();
                        // console.log(production);
                        let symbol_list = production.split(" ");
                        // console.log("Symbol_list", symbol_list);

                        let allNullable = symbol_list.every( ( sym: string) => {
                            return nullable.has(sym);
                        });
                        
                        if( allNullable )
                        {
                            if(!nullable.has(nonterminal))
                            {
                                stable = false;
                                nullable.add(nonterminal);// = union( nullable , N )
                            }
                        }
                    }
                }
            }
        }
        nullable.delete("");
        return nullable;
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