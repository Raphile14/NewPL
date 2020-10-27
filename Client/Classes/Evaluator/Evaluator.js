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
                this.state(code[1]);
            }
            else if (code[0] == 'lnstate') {
                this.state('\n' + code[1]);
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
                    defined_variables[code[1]['name']] = {type: code[1]['type'], value: code[1]['value']} ;
                }
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
    state(v) {
        $("#code_result").val($("#code_result").val() + v);
    }

    stop() {
        this.program = false;
    }
}