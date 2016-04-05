//print midi messages to the console

//initialize midi
__.midi_init(function(){

    __.midi_noteon(function(data){
        console.log(data);
    });

    __.midi_noteoff(function(data){
        console.log(data);
    });

    __.midi_control(function(data){
        console.log(data);
    });

});