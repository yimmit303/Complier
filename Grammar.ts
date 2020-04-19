

export class Grammar
{
    mProductions: Map<string, RegExp>;
    mSymbols: Set<string>;
    mInput: string;
    mNonTerminatorSymbols: Array<string>;
    mStartSymbol: string;

    constructor(input: string) 
    {
        // console.log(input);
        this.mInput = input;
        this.mProductions = new Map<string, RegExp>();
        this.mSymbols = new Set<string>();
        this.mNonTerminatorSymbols = new Array<string>();
        this.mStartSymbol = null;

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
                    if (this.mStartSymbol == null)
                    {
                        this.mStartSymbol = expression[0];
                    }
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

    getFirst(): Map<string, Set<string>>
    {
        let first = new Map<string, Set<string>>();
        for(let symbol of this.mSymbols)
        {
            if(!this.mNonTerminatorSymbols.includes(symbol))
            {
                first.set(symbol, new Set<string>([symbol]));
            }
            else
            {
                first.set(symbol, new Set<string>());
            }

        }
        let nullable: Set<string> = this.getNullable();
        let stable = false;
        while(!stable)
        {
            stable = true;
            for (let nonterminal of this.mNonTerminatorSymbols)
            {
                let production_list = this.mProductions.get(nonterminal).source.split("|");
                for (let production of production_list)
                {
                    production = production.trim();
                    let symbol_list = production.split(" ");
                    for (let symbol of symbol_list)
                    {
                        if (symbol.length > 0)
                        {
                            let pre_list = new Set<string>();
                            first.get(nonterminal).forEach(pre_list.add, pre_list);
                            first.set(nonterminal, set_concatnation(first.get(nonterminal), first.get(symbol)));
                            if(set_compare(first.get(nonterminal), pre_list) == false)
                            {
                                stable = false;
                            }
                            if (!nullable.has(symbol))
                            {
                                break;
                            }
                        }
                    }
                }
            }
        }
        return first;
    }

    getFollow(): Map<string, Set<string>>
    {
        let nullable = this.getNullable();
        let first = this.getFirst();
        let follow = new Map<string, Set<string>>();
        for(let symbol of this.mSymbols)
        {
            if(this.mNonTerminatorSymbols.includes(symbol))
            {
                follow.set(symbol, new Set<string>());
            }
        }
        follow.set(this.mStartSymbol, new Set<string>(["$"]));
        let stable: boolean = false;
        while( !stable)
        {
            stable = true;
            for (let nonterminal of this.mNonTerminatorSymbols)
            {
                let production_list = this.mProductions.get(nonterminal).source.split("|");
                for (let production of production_list)
                {
                    let symbol_list = production.trim().split(" ");
                    for (let i = 0; i < symbol_list.length; i++)
                    {
                        let symbol = symbol_list[i];
                        if (symbol.length > 0)
                        {
                            if(this.mNonTerminatorSymbols.includes(symbol))
                            {
                                let broke_out = false;
                                for (let j = i+1; j < symbol_list.length; j++)
                                {
                                    let other_symbol = symbol_list[j]
                                    let pre_list = new Set<string>();
                                    follow.get(symbol).forEach(pre_list.add, pre_list);
                                    // follow[symbol] = union(follow[symbol],first[other_symbol])
                                    follow.set(symbol, set_concatnation(follow.get(symbol), first.get(other_symbol)));
                                    if(set_compare(follow.get(symbol), pre_list) == false)
                                    {
                                        stable = false;
                                    }
                                    if (!nullable.has(other_symbol))
                                    {
                                        broke_out = true;
                                        break
                                    }
                                }
                                if (broke_out == false)
                                {
                                    let pre_list = new Set<string>();
                                    follow.get(symbol).forEach(pre_list.add, pre_list);
                                    // follow[symbol] = union(follow[nonterminal],follow[symbol])
                                    follow.set(symbol, set_concatnation(follow.get(nonterminal), follow.get(symbol)));
                                    if(set_compare(follow.get(symbol), pre_list) == false)
                                    {
                                        stable = false;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        // console.log("My follow: ", follow);
        return follow;
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

function set_concatnation(set1: Set<string> , set2: Set<string>): Set<string>
{
    let ret_set = new Set<string>();
    for(let set1_string of set1)
    {
        ret_set.add(set1_string);
    }
    for(let set2_string of set2)
    {
        ret_set.add(set2_string);
    }
    return ret_set;
}

function set_compare(set1: Set<string>, set2: Set<string>): boolean
{
    if(set1.size != set2.size)
    {
        return false;
    }
    for(let i = 0; i < set1.size; i++)
    {
        if(Array.from(set1).sort()[i] != Array.from(set2).sort()[i])
        {
            return false;
        }
    }
    return true;
}