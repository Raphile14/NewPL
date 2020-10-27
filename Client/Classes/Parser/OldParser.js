class Parser {
    constructor(tokens, errorClass) {
        this.tokens     = tokens
        this.AST        = [];
        this.error      = false;
        this.errorClass = errorClass;
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
        let added_label = false;

        console.log(this.tokens)
        for (let token in this.tokens) {
            if (!this.error) {
                // console.log(this.tokens[token])
                // console.log (this.tokens[token]['id'])            
                if (this.tokens[token]['id'] == 'label') {
                    let value = this.tokens[token]['value'];
                    let t = {};
                    t[value] = []
                    
                    if (parent != t && !added_label) {
                        parent = this.tokens[token]['value'];
                        added_label = true;
                        this.AST.push(t);
                    }
                    else {
                        this.error = true;
                        console.log(this.AST)
                        this.errorClass.state(3, this.tokens[token-1]['line'], this.tokens[token-1]['column'] - 1);
                    }
                    // console.log("1")
                }
                else if (this.tokens[token]['id'] == 'keyword') {                             
                    if (this.tokens[token]['value'] == 'end') {
                        // If there is no parent
                        if (jQuery.isEmptyObject(parent) || !added_label) {                            
                            this.error = true;
                            this.errorClass.state(4, this.tokens[token]['line'], this.tokens[token]['column']);
                        }
                        else {
                            let value = this.tokens[token]['value'];
                            let t = {};
                            t[value] = 0
                            added_label = false;      
                            this.add_node(parent, t);
                        }                    
                    }
                    else if (this.tokens[token]['value'] == 'stop') {
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
        }
        // console.log(this.AST)
        // console.log(this.AST[1])
        // console.log(this.AST[0]['start'][0]);        
    }
}