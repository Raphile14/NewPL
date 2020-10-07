////////////////////////////////////////
// Storage Variables
////////////////////////////////////////
let socket = io();

////////////////////////////////////////
// Socket.IO
////////////////////////////////////////
socket.on('usersOnline', (data) => {
    $("#user_count").text(data.number);
});

////////////////////////////////////////
// JQuery
////////////////////////////////////////
$(document).ready(() => {
    $("#code_input").val("");
    $("#code_result").val("");

    // Button Assignment
    // Clear
    $("#clear_run").click(()=>{
        $("#code_input").val("");
    });
    $("#clear_terminal").click(()=>{
        $("#code_result").val("");
    });

    // Run
    $("#run").click(()=>{
        main($("#code_input").val());
        // console.log($("#code_input").val());
    });

});
