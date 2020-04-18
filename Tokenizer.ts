import { Grammar } from "./Grammar";
import { Token } from "./Token";

export class Tokenizer
{
    mInputData: string;
    mIdx: number = 0;
    mCurrentLine : number = 1;
    mGrammar: Grammar = null;
    mPreviousTokens: Token[] = [];
    mAtEnd: boolean = false;

    constructor( grammar: Grammar )
    {
        this.mGrammar = grammar;
        this.mCurrentLine = 1;
        this.mIdx = 0;
        this.mPreviousTokens = [];
        this.mAtEnd = false;
    }

    setInput( inputData: string )
    {
        this.mInputData = inputData
        this.mCurrentLine = 1;
        this.mIdx = 0;
        this.mPreviousTokens = [];
        this.mAtEnd = false;
    }
    
    next(): Token 
    {
        // console.log("T.next() call at idx ", this.mIdx)
        if(this.mIdx >= this.mInputData.length)
        {
            //special "end of file" metatoken
            let eof = new Token("$", undefined, this.mCurrentLine);

            this.mAtEnd = true;
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
                    if (this.mPreviousTokens.push(tok) == 3)
                    {
                        this.mPreviousTokens.shift();
                    }
                    // console.log("\t", tok)
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

    expect(expected: string): Token
    {
        let actual_token = this.next();
        if (actual_token.sym != expected)
        {
            let error_string = "ERROR - Expected: " + expected + " - Got: " + actual_token.sym + " at line: " + actual_token.line;
            throw new Error(error_string);
        }
        return actual_token;
    }

    previous(): Token
    {
        return this.mPreviousTokens[0];
    }

    atEnd(): Boolean
    {
        return this.mAtEnd;
    }

    peek(): Token
    {
        var previous_idx = this.mIdx;
        var previous_line = this.mCurrentLine;
        var peeked_token: Token = this.next();
        this.mIdx = previous_idx;
        this.mCurrentLine = previous_line;
        return peeked_token;
    }

    peek2(): Token
    {
        var previous_idx = this.mIdx;
        var previous_line = this.mCurrentLine;
        var peeked_token: Token = this.next();
        peeked_token = this.next();
        this.mIdx = previous_idx;
        this.mCurrentLine = previous_line;
        return peeked_token;
    }
}