// const readlineSync = require('readline-sync');
// const Lexer = require('./Lexer/Lexer.js');
// const Parser = require('./Parser/Parser.js');
// const Evaluator = require('./Evaluator/Evaluator.js');
// const fs = require('fs');
 

function main(data) {
    // Clear Cache
    defined_functions = [];
    defined_variables = [];

    // console.log(data)
    // let data = fs.readFileSync('hello.new', 'UTF-8');
    // let errorClass = new Error(data);
    // let lexer = new Lexer(data, errorClass);        
    let lexer = new Lexer(data);    
    // let parser = new Parser(lexer.tokens, errorClass);    
    let parser = new Parser(lexer.tokens);    

    // Generate Tokens
    lexer.tokenizer()
    // console.log("TOKENS:")    
    // for (let x in lexer.tokens) {
    //     console.log(lexer.tokens[x]);
    // }    
    // console.log(lexer.tokens + "\n")

    // Generate AST
    parser.build_AST()
    // console.log("AST:")
    console.log(parser.AST)

    // Evaluate AST
    // let evaluator = new Evaluator(parser.AST, errorClass)
    let evaluator = new Evaluator()
    // console.log("OUTPUT:")
    evaluator.run(parser.AST)
    $("#code_result").val($("#code_result").val() + "\n");
    console.log(defined_variables);
    // console.log(defined_functions);
    // let result = evaluator.result;
    // console.log(evaluator.result.length)
}

// main();