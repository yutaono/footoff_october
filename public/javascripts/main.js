$(function(){

    var socket = io.connect(window.location.hostname);
    var mode = 0;

    $('.mode').bind('touchstart click', function(){
        mode = $(this).attr('name') - 0;
        $(".mode[name!="+mode+"]").css('background-color', '#fae02f');
        $(this).css('background-color', '#fa2fe0');
        socket.emit('mode change', mode);
    });

});

