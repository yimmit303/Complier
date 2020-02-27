

export class Grammar
{
    mTerminalList: Terminal[] = []

    constructor( grammar:string )
    {
        this.mTerminalList.push(new Terminal("WHITESPACE", new RegExp(/(\s|\n)+/gy)));
        this.mTerminalList.push(new Terminal("COMMENT", new RegExp(/\/\*(.|\n)*?\*\//gy)));

        let expressions: string[] = grammar.split("\n");
        for(var i = 0; i < expressions.length; i++)
        {
            if(expressions[i].length > 0)
            {
                let expression = expressions[i].split("->");
                let symbol = expression[0].trim();
                let regex = expression[1].trim();
                if (expression.length != 2)
                {
                    throw new Error("The production is the wrong length");
                }
                
                for(var j = 0; j < this.mTerminalList.length; j++)
                {
                    if(this.mTerminalList[i].mSymbol == expression[0])
                    {
                        throw new Error("Duplicate Symbol");
                    }
                }
                this.mTerminalList.push(new Terminal(symbol, new RegExp(regex, 'gy')));
            }
        }
    }
}

class Terminal
{
    mSymbol: string;
    mRegex: RegExp;

    constructor(symbol: string, regex: RegExp)
    {
        this.mSymbol = symbol;
        this.mRegex = regex;
    }
}