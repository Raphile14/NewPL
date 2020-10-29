class Token {
    constructor(id, value) {
        this.id = id;
        this.value = value;
        this.total = position.getTotal();
    }
}
class StringPrint {
    constructor(id, value, isString) {
        this.id = id;
        this.value = value;
        this.isString = isString;
        this.total = position.getTotal();
    }
}
class Variable {
    constructor(id, value, type) {        
        this.id = id;        
        this.name = type;
        this.value = value;
        this.total = position.getTotal();
    }
}
class Exec {
    constructor(id, value, name) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.total = position.getTotal();
    }
}
class Loop {
    constructor(id, value, name) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.total = position.getTotal();
    }
}
class Enter {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.value = null;
        this.total = position.getTotal();
    }
}
class Lexer {
    constructor(data) {
        this.data = data;
        this.tokens = [];
    }

    tokenizer() {
        // console.log(keywords.length)
        // console.log(this.data);

        // Current status
        let status = '';
        let id = ''; // for variable declaration
        let current_value = '';
        let collect = false; // set to collect string values
        let stringVal = false; // determing if collect string value is a string or variable
        let char = false; // determine character collection

        // Running through each character
        for (let x = 0; x < this.data.length; x++) {
            // Increment Column Count and total count
            position.advanceColumn();
            position.advanceTotal();

            // Increment Line Count
            if (this.data[x] == '\n') {
                position.resetColumn();
                position.advanceLine();
            }

            // Check if current value is a command found in keywords
            else if (keywords.includes(current_value) && status == '') {
                status = current_value;
                current_value = '';
                // console.log(status);
            }

            // Function definition by looking for '{'
            else if (this.data[x] == '{' && status == 'func') {                
                this.tokens.push(new Token(status, current_value));
                this.tokens.push(new Token('container', 'open'));
                status = '';
                current_value = '';
            }

            // Looking for '}' to end a function
            else if (this.data[x] == '}' && (!collect)) {
                this.tokens.push(new Token('container', 'close'));
                status = '';
                current_value = '';
            }

            // Detect Variable declaration with value
            // OR
            // Executing change string value or mathematical evaluation
            // OR
            // Accept Looping and If statements            
            else if (this.data[x] == '=' && (data_types.includes(status) || status == 'exec' || status == 'loop' || status == 'if' || status == 'enter')) {
                id = current_value;
                current_value = '';
            }                            

            // Printing lnstate and state STRING VERSION 
            // Acquiring data for loop, if statement, and exec
            else if ((status == 'lnstate' || status == 'state' || status == 'exec' || status == 'loop' || status == 'if' || data_types.includes(status)) && this.data[x] == '"') {
                // Allow collection of string with whitespaces
                if (!collect) {
                    collect = true;
                    char = true;
                }
                // Turn off string collection
                else if (collect) {
                    collect = false;
                    stringVal = true;
                    char = false;
                    // console.log(current_value)
                }
                // console.log("print function");
            }

            // Printing lnstate and state VARIABLE VERSION 
            // OR
            // Accept enter function
            else if ((status == 'lnstate' || status == 'state' || status == 'enter' ) && (this.data[x] == '(' || this.data[x] == ')') && !char) {
                // Allow collection of string with whitespaces
                if (!collect && this.data[x] == '(') {
                    collect = true;                    
                }
                // Turn off string collection
                else if (collect && this.data[x] == ')') {
                    collect = false;                    
                    // console.log(current_value)
                }
                // console.log("print function");
            }

            // Detect Delimeter
            else if (this.data[x] == ';' && !collect) {                
                // TODO: store to global storage and check if variable exists 
                // Declared variable without value
                if (data_types.includes(status) && current_value != '' && id == '') {
                    this.tokens.push(new Variable(status, null, current_value));
                }
                // Declared str with value
                else if (status == 'str' && current_value != '' && id != '') {
                    // TODO: Add capability to increment variables to string
                    this.tokens.push(new Variable(status, current_value, id));
                }
                // Declared int with value
                else if (status == 'int' && current_value != '' && id != '') {
                    // TODO: Add error check if value is not an int
                    this.tokens.push(new Variable(status, parseInt(current_value), id));
                }
                // Declared float with value
                else if (status == 'flt' && current_value != '' && id != '') {
                    // TODO: Add error check if value is not an float
                    this.tokens.push(new Variable(status, parseFloat(current_value), id));
                }
                // Declared boolean with value
                else if (status == 'bool' && current_value != '' && id != '') {
                    // TODO: Add error check if value is not an bool                    
                    let value;
                    if (current_value == 'true') {
                        value = true
                    }
                    else if (current_value == 'false') {
                        value = false
                    }
                    else {
                        // TODO: Error if not a boolean input
                        console.log("boolean error");
                        break;
                    }
                    this.tokens.push(new Variable(status, value, id));
                }

                // Printing
                else if (status == 'lnstate' || status == 'state') {
                    if (stringVal) {
                        this.tokens.push(new StringPrint(status, current_value, true));
                    }
                    else {
                        this.tokens.push(new StringPrint(status, current_value, false));
                    }
                    stringVal = false;
                    // console.log(status)
                    // console.log(current_value)
                    // console.log("pushed")
                }

                // Execution
                else if ((status == 'exec')) {
                    if (current_value != '' && id != '') {
                        this.tokens.push(new Exec(status, current_value, id));
                    }
                    else if (id == '') {
                        // TODO: Raise error for no variable name
                    }
                    else {
                        // TODO: Raise error for no value
                    }
                    stringVal = false;
                }

                // Looping or if
                else if (status == 'loop' || status == 'if') {
                    if (current_value != '' && id != '') {
                        this.tokens.push(new Loop(status, current_value, id));
                    }
                    else if (id == '') {
                        // TODO: Raise error for no variable name
                    }
                    else {
                        // TODO: Raise error for no value
                    }
                    stringVal = false;
                }

                // Enter value from user
                else if (status == 'enter') {
                    if (current_value != '') {
                        this.tokens.push(new Enter(status, current_value));
                    }
                    else if (current_value == '') {
                        // TODO: Raise error for no variable name
                    }
                    else {
                        // TODO: Raise error for no value
                    }
                }

                // Calling a function
                else if (status == 'call' && current_value != '') {
                    // console.log('function ' + current_value + ' is called');
                    this.tokens.push(new Token(status, current_value));
                }                

                id = '';
                status = '';
                current_value = '';
            }

            // Check if current character is a whitespace and not include it if the code is not collecting strings
            else if ((this.data[x] == ' ' || this.data[x] == '\t' || this.data[x] == '\r') && (!collect)) {
                continue;
            }

            // Record current character
            else {
                current_value += this.data[x];
            }            
        }
        // console.log(current_value);
        console.log(this.tokens);
        // console.log(position)
    }
}