import { Token } from "./Token";

export class TreeNode{
    sym: String;
    token: Token;
    children: TreeNode[];
    NUMBER: number;
    
    constructor(sym: String, token: Token)
    {
        this.sym = sym;
        this.token = token;
        this.children = [];
    }

    addChild(child: TreeNode)
    {
        this.children.push(child);
    }
}