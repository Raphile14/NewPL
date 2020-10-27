class Position {
    constructor() {
        this.line = 0;
        this.column = 0;
        this.total = 0;
    }

    advanceTotal() {
        this.total++;
    }

    advanceLine() {
        this.line++;
    }

    advanceColumn() {
        this.column++;
    }

    resetLine() {
        this.line = 0;
    }

    resetColumn() {
        this.column = 0;
    }

    getTotal() {
        return this.total;
    }
}