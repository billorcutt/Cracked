//set up sounds- start sine w/ freq = 0
__().sine(0).dac(0.5).play();
//configure loop- 100ms
__().loop(100);
//bind callback on the sine. listen for steps
__("sine").bind("step",function(index,data,array){
    //init variables, store properties on the array
    //so we can persist values between callbacks
    var upper=9;
    array.dir = __.isUndef(array.dir)? "up": array.dir;
    array.count = __.isUndef(array.count)? 0: array.count;
    //go up, then come back. repeat.
    if(index===0 && array.dir==="up" && array.count < upper) {
        array.count++;
    } else if (index===0 && array.dir==="up" && array.count === upper) {
        array.reverse();
        array.dir = "down";
        array.count=array.count-1;
    } else if(index===0 && array.dir==="down" && array.count > 0) {
        array.count=array.count-1;
    } else if(index===0 && array.dir==="down" && array.count === 0) {
        array.reverse();
        array.dir = "up";
        array.count++;
    }
    //calculate pitch
    var p = data+(array.count*10);
    //set frequency with the new value
    __.frequency(__.pitch2freq(p));
},[30,31,32,33,34,35,36,37,38,39]);
//start it
__().loop("start");