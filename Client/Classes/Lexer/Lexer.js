// Types
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

            // If '{' or '}' is called without function falling
            else if ((this.data[x] == '{' || this.data[x] == '}') && (status == '')) {
                error_class.log_error(position.getTotal(), 18);
                break;
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
                    char = false;
                    if (status == 'lnstate' || status == 'state') {
                        stringVal = true;
                    }                                        
                }
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
                }
            }

            // Detect Delimeter
            else if (this.data[x] == ';' && !collect) {                
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
                    let int_check = /^-?[0-9]+$/;
                    if (int_check.test(current_value)) {
                        this.tokens.push(new Variable(status, parseInt(current_value), id));
                    }
                    else {
                        error_class.log_error(position.getTotal(), 1);
                        break;
                    }
                }
                // Declared float with value
                else if (status == 'flt' && current_value != '' && id != '') {
                    let flt_check = /^[-+]?[0-9]+\.[0-9]+$/;
                    let int_check = /^-?[0-9]+$/;
                    if (flt_check.test(current_value) || int_check.test(current_value)) {
                        this.tokens.push(new Variable(status, parseFloat(current_value), id));
                    }
                    else {
                        error_class.log_error(position.getTotal(), 2);
                        break;
                    }                    
                }
                // Declared boolean with value
                else if (status == 'bool' && current_value != '' && id != '') {                  
                    let value;
                    if (current_value == 'true') {
                        value = true
                    }
                    else if (current_value == 'false') {
                        value = false
                    }
                    else {
                        error_class.log_error(position.getTotal(), 0);
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
                }

                // Execution
                else if ((status == 'exec')) {
                    if (current_value != '' && id != '') {
                        this.tokens.push(new Exec(status, current_value, id));
                    }
                    else if (id == '') {
                        error_class.log_error(position.getTotal(), 3);
                        break;
                    }
                    else if (current_value == '') {
                        error_class.log_error(position.getTotal(), 4);
                        break;
                    }
                    stringVal = false;
                }

                // Looping or if
                else if (status == 'loop' || status == 'if') {
                    if (current_value != '' && id != '') {
                        this.tokens.push(new Loop(status, current_value, id));
                    }
                    else if (id == '') {
                        if (status == 'loop') {
                            error_class.log_error(position.getTotal(), 5);
                            break;
                        }                        
                        else if (status == 'if') {
                            error_class.log_error(position.getTotal(), 6);
                            break;
                        }
                        break;
                    }
                    else if (current_value == '') {
                        if (status == 'loop') {
                            error_class.log_error(position.getTotal(), 7);
                            break;
                        }                        
                        else if (status == 'if') {
                            error_class.log_error(position.getTotal(), 8);
                            break;
                        }
                        break;
                    }
                    stringVal = false;
                }

                // Enter value from user
                else if (status == 'enter') {
                    if (current_value != '') {
                        this.tokens.push(new Enter(status, current_value));
                    }
                    else if (current_value == '') {
                        error_class.log_error(position.getTotal(), 9);
                        break;
                    }
                }

                // Calling a function
                else if (status == 'call' && current_value != '') {
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
    }
}