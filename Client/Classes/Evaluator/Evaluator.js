class Evaluator {
    constructor(AST) {
        this.AST = AST;
        this.result = '';
        this.program = true;
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
        if (loc[1] instanceof Array) {
            this.run(loc[1]);
        }
        else if (loc[0] == 'state') {
            this.state(loc[1]);
        }
        else if (loc[0] == 'stop') {
            this.stop();
        }
        else if (loc[0] == 'go') {
            this.go(loc[1]);
        }
    }

    go(v) {
        for (let node in this.AST) {
            if (this.AST[node][v]) {
                this.run(this.AST[node][v])
            }
        }
    }

    state(v) {
        $("#code_result").val($("#code_result").val() + v);
    }

    stop() {        
        this.program = false;        
    }
}