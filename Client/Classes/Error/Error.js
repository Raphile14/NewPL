class Error {
    constructor(data) {
        this.data = data;
        this.storage = {
            "0": {
                "name": "Illegal Character on an Arithmetic Operation!",
                "type": "Syntax Error:"
            },
            "1": {
                "name": "Function label is not defined!",
                "type": "Syntax Error:"
            },
            "2": {
                "name": "Invalid Syntax! Last command not registered",
                "type": "Syntax Error:"
            },
            "3": {
                "name": "A prior function label must contain an 'end'!",
                "type": "Syntax Error:"
            },
            "4":  {
                "name": "An 'end' command must be in a function label",
                "type": "Syntax Error:"
            }
        }
    }
    stateLabel (code, label) {
        console.log(label.length)
        let pointer = (" ").repeat(label.length) + "^";
        let error_message = (
            "\n" + label + "\n" + pointer + "\n" +
            this.storage[code]["type"] + " " + this.storage[code]["name"])
            $("#code_result").val($("#code_result").val() + error_message + "\n");        
        throw {

        }
    }
    state(code, line, column) {
        let inLineCounter = 1;
        let error_code = "";
        let found = false;
        for (let loc in this.data) {                     
            for (let x in this.data[loc]) {
                if (!found) {
                    if (this.data[loc][x] != "\n") {
                        error_code += this.data[loc][x];
                    }                    
                    if (this.data[loc][x] == "\n") {
                        if (inLineCounter == line) {
                            found = true;
                        }
                        else {
                            inLineCounter ++;
                            error_code = "";
                        }                        
                    }
                }                
            }
        }
        let pointer = (" ").repeat(column) + "^";
        let error_message = (
        error_code + "\n" + pointer + "\n" +
        this.storage[code]["type"] + " " + this.storage[code]["name"]
        + "\n\tat line: " + line + "\n\tat column: " + column);
        $("#code_result").val($("#code_result").val() + error_message + "\n");        
        throw  {

        }  
          
    }
}