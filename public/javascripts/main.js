$(function(){

    var socket = io.connect(window.location.hostname);

    $('#mode1').click(function(){
        socket.emit('mode change', 1);
    });

    $('#mode2').click(function(){
        socket.emit('mode change', 2);
    });

    $('#mode3').click(function(){
        socket.emit('mode change', 3);
    });

    $('#mode4').click(function(){
        socket.emit('mode change', 4);
    });

});

