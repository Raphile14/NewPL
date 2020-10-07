class Parser {
    constructor(tokens) {
        this.tokens     = tokens
        this.AST        = [];
    }

    add_node(parent, node) {        
        for (let a in this.AST) {
            // console.log(this.AST[a])
            // console.log(this.AST[a][parent])
            if (this.AST[a][parent]) {
                this.AST[a][parent].push(node);   
                // console.log(node)
            }            
        }
    }

    build_AST() {
        let saved       = {};
        let parent      = {};
        let collect     = false

        for (let token in this.tokens) {
            // console.log(this.tokens[token])
            // console.log (this.tokens[token]['id'])            
            if (this.tokens[token]['id'] == 'label') {
                let value = this.tokens[token]['value'];
                let t = {};
                t[value] = []
                
                if (parent != t) {
                    parent = this.tokens[token]['value'];
                    this.AST.push(t);
                }     
                // console.log("1")
            }
            else if (this.tokens[token]['id'] == 'keyword') {
                if (this.tokens[token]['value'] == 'stop') {
                    let value = this.tokens[token]['value'];
                    let t = {};
                    t[value] = 0;
                    this.add_node(parent, t);
                }
                else {
                    if (!collect) {
                        saved = this.tokens[token];
                        // console.log(saved)
                        collect = true;
                    }
                    else {
                        let t = {};
                        t[saved['value']] = this.tokens[token]['value'];
                        this.add_node(parent, t);
                        collect = false;
                    }
                }
            }
            else if (this.tokens[token]['id'] == 'char' || this.tokens[token]['id'] == 'atom') {
                if (!collect) {
                    saved = this.tokens[token];
                    console.log("saved")
                    // console.log(saved)
                    collect = true;
                }
                else {
                    let t = {};
                    t[saved['value']] = this.tokens[token]['value'];
                    // console.log(this.tokens[token]['value'])                    
                    this.add_node(parent, t);
                    collect = false;
                }
            } 
        }
        // console.log(this.AST[1])
        // console.log(this.AST[0]['start'][0]);        
    }
}