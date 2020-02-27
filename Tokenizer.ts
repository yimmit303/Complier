import { Grammar } from "./Grammar";
import { Token } from "./Token";

export class Tokenizer
{
    mInputData: string;
    mIdx: number = 0;
    mCurrentLine : number = 1;
    mGrammar: Grammar = null;

    constructor( grammar: Grammar )
    {
        this.mGrammar = grammar;
        this.mCurrentLine = 1;
        this.mIdx = 0;
    }

    setInput( inputData: string )
    {
        this.mInputData = inputData
    }
    
    next(): Token 
    {
        if(this.mIdx >= this.mInputData.length)
        {
            //special "end of file" metatoken
            let eof = new Token("$", undefined, this.mCurrentLine);
            this.mCurrentLine = 1;
            this.mIdx = 0;
            return eof;
        }
        
        for(let i = 0; i < this.mGrammar.mTerminalList.length; ++i)
        {
            let terminal = this.mGrammar.mTerminalList[i];
            let sym = terminal.mSymbol;
            let rex = terminal.mRegex;     //RegExp
            rex.lastIndex = this.mIdx;   //tell where to start searching
            let m = rex.exec(this.mInputData);   //do the search
            if(m)
            {
                //m[0] contains matched text as string
                let lexeme = m[0];
                this.mIdx = rex.lastIndex;
                if(sym !== "WHITESPACE" && sym !== "COMMENT")
                {
                    let tok = new Token(sym, lexeme, this.mCurrentLine);
                    this.mCurrentLine += (m[0].match(/\n/g)||[]).length;
                    return tok;
                }
                else
                {
                    //skip whitespace and get next real token
                    this.mCurrentLine += (m[0].match(/\n/g)||[]).length;
                    return this.next();
                }
            }
        }
        //no match; syntax error
        throw new Error("Syntax Error");
    }

}