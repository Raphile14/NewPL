class Error {
    constructor() {
        this.data;
        this.storage = {
            "0": {
                "name": "- Invalid value for a boolean variable!",
                "type": "Syntax Error: (Boolean Declaration)"
            },
            "1": {
                "name": "- Invalid value for an integer variable!",
                "type": "Syntax Error: (Integer Declaration)"
            },
            "2": {
                "name": "- Invalid value for a float variable!",
                "type": "Syntax Error: (Float Declaration)"
            },
            "3": {
                "name": "- Executing without a variable name!",
                "type": "Syntax Error: (Execution)"
            },
            "4": {
                "name": "- Executing without a condition!",
                "type": "Syntax Error: (Execution)"
            },
            "5": {
                "name": "- Executing without a function name!",
                "type": "Syntax Error: (Looping)"
            },
            "6": {
                "name": "- Executing without a function name!",
                "type": "Syntax Error: (If Statement)"
            },
            "7": {
                "name": "- Executing without a condition!",
                "type": "Syntax Error: (Looping)"
            },
            "8": {
                "name": "- Executing without a condition!",
                "type": "Syntax Error: (If Statement)"
            },
            "9": {
                "name": "- Acquiring an input without a variable to store!",
                "type": "Syntax Error: (Enter User Input)"
            },
            "10": {
                "name": "- Function is already declared!",
                "type": "Syntax Error: (Function Declaration)"
            },
            "11": {
                "name": "- Function is not declared!",
                "type": "Syntax Error: (Function Calling)"
            },
            "12": {
                "name": "- Invalid value for a boolean variable!",
                "type": "Runtime Error: (Boolean Input)"
            },
            "13": {
                "name": "- Variable is already declared!",
                "type": "Logic Error: (Variable Declaration)"
            },
            "14": {
                "name": "- Invalid value for a boolean variable!",
                "type": "Logic Error: (Execution)"
            },
            "15": {
                "name": "- Variable to be executed does not exist!",
                "type": "Logic Error: (Execution)"
            },
            "16": {
                "name": "- Failed to execute command!",
                "type": "Runtime Error: (Execution)"
            },
            "17": {
                "name": "- Failed to state! Variable does not exist!",
                "type": "Runtime Error: (Stating)"
            },
            "18": {
                "name": "- Using a container without declaring a function!",
                "type": "Syntax Error: (Function Declaration)"
            }
        }
    }

    // TODO: Error handling for 
    // {};
    // func {};

    set_data(data) {
        this.data = data;
        
    }

    log_error(location, error_code) {

        let code = '';        
        let column = 0;
        let line = 0;
        let total = 0;
        let last_line_total = 0;

        // Run through every character and find the line
        for (let x = 0; x < this.data.length; x++) {
            column ++;
            total++;
            if (this.data[x] == '\n') {
                line ++;
                column = 0;
                code = '';
                last_line_total = total;
            }
            else {                
                code += this.data[x];
            }
            if (total == location) {
                line++;
                break;
            }
        }

        let pointer = ("_").repeat(location - last_line_total) + "^";
        $("#code_result").val($("#code_result").val() + 
        '\n' + '(' + error_code + ') ' + this.storage[error_code]["type"] + "\n\t" + this.storage[error_code]["name"] + '\n\n' +
        code + '\n' + 
        pointer + '\n\n' +
        '\tat Line:\t\t' + line + '\n' +
        '\tat Column:\t' + column + '\n');
        throw "Error Found";
    }
}