//key press


//press keys on the keyboards plays random sounds
__().sine().gain(1/32).adsr("short").out().play();
__().saw().gain(1/64).adsr("short").out().play();


__.key_press(function(e){
    __("sine").frequency(__.random(100,1000));
    __("saw").frequency(__.random(100,1000));
    __("adsr").adsr("trigger");
});

//toggle read-only (Window->Toggle Read-Only) to avoid editing the document