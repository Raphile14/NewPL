class Lexer {
    constructor(data, errorClass) {
        this.data       = data
        this.tokens     = []
        this.line       = 1;
        this.column     = 0;
        this.errorClass = errorClass;
        // TODO: transfer keywords to json file
        this.keywords   = [
            'state', 'lnstate',
            'go', 'end',
            'stop'
        ]
    }

    tokenizer() {
        // console.log(this.data);
        let tmp = [];
        let tid = '';
        for (let loc in this.data) {                     
            for (let x in this.data[loc]) {
                this.column ++;   
                let l = this.data[loc][x];
                // console.log(l);
                if (l == '"' && tid == '') {
                    tid = 'char';
                    tmp = [];
                }
                else if (l == '"' && tid == 'char') {
                    this.tokens.push({'id': tid, 'value': tmp.join(""), 'line': this.line, 'column': this.column})
                    tid = '';
                    tmp = [];
                }
                else if (l == ':') {
                    this.tokens.push({'id': 'label', 'value': tmp.join(""), 'line': this.line, 'column': this.column})
                    tmp = [];
                }
                else if (this.keywords.includes(tmp.join(""))) {
                    this.tokens.push({'id': 'keyword', 'value': tmp.join(""), 'line': this.line, 'column': this.column})
                    // tid = '';
                    tmp = [];
                }
                else if (l == "\n") {
                    this.column = 0;
                    this.line ++;
                    if (tmp.length > 0) {
                        this.tokens.push({'id': 'atom', 'value': tmp.join(""), 'line': this.line, 'column': this.column});
                        tmp = [];
                    } 
                }
                else if((l == ' ' || l == "\t" || l == "\r") && tid != 'char') {
                    continue;
                }
                else {
                    tmp.push(l);                    
                }
            }
            console.log(tmp)
            console.log("line: " + this.line)
            console.log("col: " + this.column)
        }
        
        // console.log(this.tokens)
    }
}