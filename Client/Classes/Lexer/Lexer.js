class Lexer {
    constructor(data) {
        this.data       = data
        this.tokens     = []
        // TODO: transfer keywords to json file
        this.keywords   = [
            'state',
            'go',
            'stop'
        ]
    }

    tokenizer() {
        // console.log(this.data);
        let tmp = [];
        let tid = '';
        for (let loc in this.data) {            

            for (let x in this.data[loc]) {
                let l = this.data[loc][x];
                // console.log(l);
                if (l == '"' && tid == '') {
                    tid = 'char';
                    tmp = [];
                }
                else if (l == '"' && tid == 'char') {
                    this.tokens.push({'id': tid, 'value': tmp.join("")})
                    tid = '';
                    tmp = [];
                }
                else if (l == ':') {
                    this.tokens.push({'id': 'label', 'value': tmp.join("")})
                    tmp = [];
                }
                else if (this.keywords.includes(tmp.join(""))) {
                    this.tokens.push({'id': 'keyword', 'value': tmp.join("")})
                    // tid = '';
                    tmp = [];
                }
                else if (l == "\n") {
                    if (tmp.length > 0) {
                        this.tokens.push({'id': 'atom', 'value': tmp.join("")});
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
        }
    }
}