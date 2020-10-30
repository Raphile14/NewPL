// const readlineSync = require('readline-sync');
// const Lexer = require('./Lexer/Lexer.js');
// const Parser = require('./Parser/Parser.js');
// const Evaluator = require('./Evaluator/Evaluator.js');
// const fs = require('fs');
 

function main(data) {
    // Clear Cache and current data
    defined_functions = [];
    defined_variables = [];
    position.resetData();
    error_class.set_data(data);

    // Initialize Lexer
    let lexer = new Lexer(data);    
    
    // Initialize Parser
    let parser = new Parser(lexer.tokens);    

    // Generate Tokens
    lexer.tokenizer()

    // Generate AST
    parser.build_AST()
    // console.log(parser.AST)

    // Evaluate AST
    let evaluator = new Evaluator()
    evaluator.run(parser.AST)
    $("#code_result").val($("#code_result").val() + "\n");
}