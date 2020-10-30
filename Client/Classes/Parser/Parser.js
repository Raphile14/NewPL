class Parser {
    constructor(tokens) {
        this.tokens = tokens;
        this.AST = [];
    }

    add_node(parent, AST, index, node) {
        let found = false;

        for (let x in AST) {
            if (AST[x][parent[index]]) {
                if (index == parent.length - 1) {
                    AST[x][parent[parent.length - 1]].push(node);
                    found = true;                    
                    break;
                }    
                else {
                    this.add_node(parent, AST[x][parent[index]], index++, node);
                }            
            }             
        }   
        
        if (!found) {

        }
    }

    build_AST() {
        let saved = {};
        let parent = [];
        let collect = false;
        let added_func = false;
        let value = '';

        for (let x in this.tokens) {

            // Check if current element is a function
            if (this.tokens[x]['id'] == 'func') {
                value = this.tokens[x]['value'];
                // added_func = true;
            }

            // Check if current element is a container open
            else if (this.tokens[x]['id'] == 'container') {
                
                // If function declaration is called
                // if (added_func) {

                    // If current element is a '{'
                if (this.tokens[x]['value'] == 'open') {
                    let t = {};
                    t[value] = [];

                    // Check if a parent is existing based on top code
                    if (parent.length == 0) {
                        this.AST.push(t);
                    }
                    else {                            
                        this.add_node(parent, this.AST, 0, t);
                    }
                    parent.push(value);
                }

                // If current element is a '}'
                // Close temporary storage
                else if (this.tokens[x]['value'] == 'close') {
                    // added_func = false;
                    parent.pop();
                }
                // }

                // If function declaration is not called
                else if (parent.length == 0) {
                    error_class.log_error(position.getTotal(), 18);
                }
                
            }

            // If current element is a variable
            else if (data_types.includes(this.tokens[x]['id'])) {
                let t = {};
                t['variable'] = {'name': this.tokens[x]['name'], 'type': this.tokens[x]['id'],'value': this.tokens[x]['value']};

                // If a function is not declared
                if (parent.length == 0) {
                    this.AST.push(t);
                }   
                // If a function is declared
                else {                    
                    this.add_node(parent, this.AST, 0, t);
                }             
            }

            // Check if current value is an accepted action
            // Does not support inside function function declaration
            else if (keywords.includes(this.tokens[x]['id']) && this.tokens[x]['id'] != 'func' && !data_types.includes(this.tokens[x])) {

                // Inital values
                // Convert actions into json readables
                let t = {};
                t[this.tokens[x]['id']] = this.tokens[x];

                // If called outside a function or no parent
                if (parent.length == 0) {
                    this.AST.push(t);
                }
                
                // If command has a parent
                else {
                    this.add_node(parent, this.AST, 0, t);
                }
            }
        }
    }
}