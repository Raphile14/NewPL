class Evaluator {
    constructor() {
        // this.AST = AST;
        this.program = true;
    }

    run(node) {
        if (this.program) {
            if (node instanceof Array) {
                for (let n in node) {
                    for (let [k, v] of Object.entries(node[n])) {
                        this.execute([k, v]);
                        // console.log("first")
                        // console.log(k)
                        // console.log(v)      
                        // console.log("-----")                  
                    }
                }
            }
            else if (typeof node == Object) {
                for (let [k, v] of Object.entries(node[n])) {
                    this.execute([k, v]);
                    // console.log("second")
                    // console.log(k)
                    // console.log(v)                    
                    // console.log("-----")                  
                }
            }
        }
    }

    execute(code) {
        if (this.program) {
            if (code[1] instanceof Array) {
                // TODO: Should not run unless called
                // this.run(code[1]);
                if (defined_functions[code[0]]) {
                    // TODO: Function already declared
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
                if (defined_variables[code[1]['name']]) {
                    // TODO: Error variable already exists
                    console.log('variable already exists')
                }
                else {
                    defined_variables[code[1]['name']] = {type: code[1]['type'], value: code[1]['value']};
                    window[code[1]['name']] = code[1]['value'];
                }
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
                    // TODO: Error function does not exist
                }
            }
        }
    }

    // Method Functions
    exec(code) {
        if (defined_variables[code[1]['name']]) {
            console.log('exec called')

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
                        // TODO: Error invalid input
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
                console.log('error executing command')
            }                
        }
        else {
            // TODOl Error variable does not exist
            console.log('Variable ' + code[1]['name'] + ' does not exist')
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
                // TODO: error if variable does not exist
            } 
        }
        $("#code_result").val($("#code_result").val() + value);        
    }

    stop() {
        this.program = false;
    }
}