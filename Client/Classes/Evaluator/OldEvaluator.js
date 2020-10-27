class Evaluator {
    constructor(AST, errorClass) {
        this.AST = AST;
        this.result = '';
        this.program = true;
        this.errorClass = errorClass;
    }

    run(node) {
        if (this.program) {
            if (node instanceof Array) {
                for (let n in node) {
                    for (let [k, v] of Object.entries(node[n])) {
                        this.execute([k, v])
                    }
                }
            }
            else if (typeof node == Object) { // a.constructor == Object
                for (let [k, v] of Object.entries(node[n])) {
                    this.execute([k, v])
                }
            }
        }        
    }

    execute(loc) {
        if (this.program) {
            if (loc[1] instanceof Array) {
                this.run(loc[1]);
            }
            else if (loc[0] == 'state') {
                this.state(loc[1]);
            }
            else if (loc[0] == 'lnstate') {
                this.lnstate(loc[1]);
            }
            else if (loc[0] == 'stop') {
                this.stop();
            }
            else if (loc[0] == 'go') {
                this.go(loc[1]);
            }
            else if (loc[0] == 'end') {
                this.end();
            }
        }        
    }

    // Method Functions
    go(v) {
        let exist = false;
        for (let node in this.AST) {
            if (this.AST[node][v]) {
                this.run(this.AST[node][v])
                exist = true;
            }
        }
        if (!exist) {
            console.log(this.AST);
            this.errorClass.stateLabel(1, v);            
        }
    }

    state(v) {
        $("#code_result").val($("#code_result").val() + v);
    }

    lnstate(v) {
        $("#code_result").val($("#code_result").val() + v + "\n");
    }

    stop() {        
        this.program = false;        
    }

    end() {      
        // this.program = false;    
    }
}