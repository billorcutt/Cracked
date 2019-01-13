//mouse movement

//move the mouse to hear the change.
__().sine().gain(1/32).out().play();
__().saw().gain(1/64).out().play();


//callback function is triggered by the mouse movement.
__.mouse_movement(function(e){
    //get the position with clientX & clientY
    __("sine").frequency(e.clientX);
    __("saw").frequency(e.clientY);
});