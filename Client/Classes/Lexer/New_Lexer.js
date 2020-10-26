class Lexer {
    constructor(data) {
        this.data = data;
        this.converted = [];
        this.tokens = [];
    }

    tokenizer() {
        console.log(keywords.length)
        this.converted = this.data.split(/\s/);
        console.log(this.data);
        console.log(this.converted);

        // Current Status
        let status = '';
        let current_value = '';
        let bracket = false;

        // Checking of each element
        for (let x = 0; x < this.converted.length; x++) {
            console.log(this.converted[x])
            // Check if status is cleared
            if (status == '') {
                // If the element signifies a function definition
                if (keywords.includes(this.converted[x])) {
                    status = this.converted[x];                    
                }

                else if (this.converted[x] == '}' && bracket) {
                    bracket = false;
                    this.tokens.push({'id': 'container', 'value': 'close'});
                }

                // If element is an empty line or string
                else if (this.converted[x] == '') {
                    
                }

                // Error log for non-logic input
                else {
                    console.log('Syntax Error!');
                    break;
                }
            }

            // If a printing command is called
            else if (status == 'state' || status == 'stateln') {

            }

            // If a variable declaration is declared
            else if (status == 'var') {

            }

            // Check if function definition is called
            else if (status == 'func') {
                // Check if function is already declared
                if (defined_functions.includes(this.converted[x])) {
                    console.log('function ' + this.converted[x] + ' is already declared');
                    break;
                    // TODO: raise error that function is already defined
                }    
                
                // If current element is an open bracket
                else if (this.converted[x] == '{' && current_value != '') {
                    current_value = '';
                    status = '';
                    this.tokens.push({'id': 'container', 'value': 'open'});
                    bracket = true;
                }

                // If function name is not yet declared
                else {
                    // Check if syntax error (ie. func main main ())
                    if (current_value != '') {
                        // TODO: raise error for invalid function call
                        console.log('Syntax Error!');
                        break;
                    }                    

                    // If current element is a unique value
                    else {
                        current_value = this.converted[x];
                        defined_functions.push(current_value);
                        this.tokens.push({'id': 'function', 'value': current_value});
                    }
                }
            }
        }
        console.log(this.tokens);
    }
}