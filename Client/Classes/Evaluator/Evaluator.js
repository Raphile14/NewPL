class Evaluator {
    constructor() {
        // this.AST = AST;
        this.program = true;
        this.received = false;
    }

    run(node) {
        if (this.program) {
            if (node instanceof Array) {
                for (let n in node) {
                    for (let [k, v] of Object.entries(node[n])) {
                        this.execute([k, v]);               
                    }
                }
            }
            else if (typeof node == Object) {
                for (let [k, v] of Object.entries(node[n])) {
                    this.execute([k, v]);                
                }
            }
        }
    }

    execute(code) {
        if (this.program) {
            if (code[1] instanceof Array) {
                if (defined_functions[code[0]]) {                    
                    error_class.log_error(position.getTotal(), 10);
                }
                else {
                    defined_functions[code[0]] = code[1];
                }                
            }
            else if (code[0] == 'state') {
                this.state(code[1], false);
            }
            else if (code[0] == 'lnstate') {
                this.state(code[1], true);
            }
            else if (code[0] == 'stop') {
                this.stop();
            }

            // Check if current element is a variable
            else if (code[0] == 'variable') {                
                this.declare_variable(code);                
            }
            
            // If execution is getting called
            else if (code[0] == 'exec') {                
                this.exec(code);
            }

            // If a function is getting called
            else if (code[0] == 'call') {
                if (defined_functions[code[1]['value']]) {
                    this.run(defined_functions[code[1]['value']]);
                }
                else {
                    error_class.log_error(position.getTotal(), 11);
                }
            }

            // If a loop is called
            else if (code[0] == 'loop') {
                this.loop(code);
            }

            // If an if statement is called
            else if (code[0] == 'if') {
                this.if_statement(code);
            }

            // If a enter command is called
            else if (code[0] == 'enter') {
                this.enter(code);
            }
        }
    }

    // Method Functions
    enter(code) {
        let data = prompt();
        
        // If value is equal to null
        if (data == 'null') {
            defined_variables[code[1]['name']]['value'] = null;
        }
        else if (defined_variables[code[1]['name']]['type'] == 'str') {
            defined_variables[code[1]['name']]['value'] = data; 
        }
        // If element is a bool
        else if (defined_variables[code[1]['name']]['type'] == 'bool') {            
            let value;
            if (data == 'true') {
                value = true;
            }
            else if (data == 'false') {
                value = false;
            }
            else {
                error_class.log_error(position.getTotal(), 12);
            }
            defined_variables[code[1]['name']]['value'] = value;                    
        }
        // If element is an int
        else if (defined_variables[code[1]['name']]['type'] == 'int') {
            let value = eval(data);
            defined_variables[code[1]['name']]['value'] = parseInt(value);  
            window[code[1]['name']] = parseInt(value);   
        }

        // If element is an float
        else if (defined_variables[code[1]['name']]['type'] == 'flt') {
            let value = eval(data);
            defined_variables[code[1]['name']]['value'] = parseFloat(value);  
            window[code[1]['name']] = parseFloat(value);   
        }   
    }

    if_statement(code) {
        if (eval(code[1]['value'])) {
            this.run(defined_functions[code[1]['name']]);
        }
    }

    loop (code) {
        while (eval(code[1]['value'])) {
            this.run(defined_functions[code[1]['name']])
        }
    }

    declare_variable (code) {
        if (defined_variables[code[1]['name']]) {
            error_class.log_error(position.getTotal(), 13);
        }
        else {
            defined_variables[code[1]['name']] = {type: code[1]['type'], value: code[1]['value']};
            window[code[1]['name']] = code[1]['value'];
        }
    }
    
    exec(code) {
        if (defined_variables[code[1]['name']]) {

            try {
                // If element is string
                if (defined_variables[code[1]['name']]['type'] == 'str') {
                    defined_variables[code[1]['name']]['value'] = code[1]['value'];                    
                }
                
                // If value is equal to null
                else if (code[1]['value'] == 'null') {
                    defined_variables[code[1]['name']]['value'] = null;    
                }

                // If element is a bool
                else if (defined_variables[code[1]['name']]['type'] == 'bool') {
                    let value;
                    if (code[1]['value'] == 'true') {
                        value = true;
                    }
                    else if (code[1]['value'] == 'false') {
                        value = false;
                    }
                    else {
                        error_class.log_error(position.getTotal(), 14);
                    }
                    defined_variables[code[1]['name']]['value'] = value;                    
                }

                // If element is an int
                else if (defined_variables[code[1]['name']]['type'] == 'int') {
                    let value = eval(code[1]['value']);
                    defined_variables[code[1]['name']]['value'] = parseInt(value);  
                    window[code[1]['name']] = parseInt(value);   
                }

                // If element is an float
                else if (defined_variables[code[1]['name']]['type'] == 'flt') {
                    let value = eval(code[1]['value']);
                    defined_variables[code[1]['name']]['value'] = parseFloat(value);  
                    window[code[1]['name']] = parseFloat(value);   
                }                
            }    
            catch (error) {
                error_class.log_error(position.getTotal(), 16);
            }                
        }
        else {
            error_class.log_error(position.getTotal(), 15);
        }
    }
    state(v, printLine) {
        let value = '';
        if (printLine) {
            value += '\n';
        }
        if (v['isString']) {
            value += v['value'];
        }
        else {
            if (defined_variables[v['value']]) {
                value += defined_variables[v['value']]['value'];             
            }           
            else {
                error_class.log_error(position.getTotal(), 17);                
            } 
        }
        $("#code_result").val($("#code_result").val() + value);        
    }

    stop() {
        this.program = false;
    }
}