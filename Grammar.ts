

export class Grammar
{
    regex_list: RegExp[] = [];
    symbol_list: string[] = [];

    private checkRegex(regex:string)
    {
        let rex = new RegExp(regex);
        this.regex_list.push(rex);
    }

    constructor( grammar:string )
    {
        let expressions: string[] = grammar.split("\n");
        for(var i = 0; i < expressions.length; i++)
        {
            if(expressions[i].length > 0)
            {
                if (expressions[i].split(" ").length != 3)
                {
                    //console.log("Invalid Production Error with production: " + expressions[i])
                    throw new Error("The production is the wrong length")
                }

                if (expressions[i].split(" ")[1] != "->")
                {
                    //console.log("Invalid Production Error with production: " + expressions[i])
                    throw new Error("Invalid production format")
                }

                if (this.symbol_list.includes(expressions[i].split(" ")[0]))
                {
                   // console.log("Duplicate Symbol Error");
                    throw new Error("Duplicate Symbol")
                }
                this.symbol_list.push(expressions[i].split(" ")[0]);
                this.checkRegex(expressions[i].split(" ")[2]);
            }
        }
    }
}