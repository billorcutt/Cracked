//stepper, a step modulator - options: number of steps, overall length in seconds,
//function that returns a step value when called, param to be modulated, & gain
__().stepper({
    steps:16,
  	modulates:"frequency",
  	gain:1000,
    length:2,
    fn:(function(){
        var arr = [8/8,7/8,6/8,5/8,4/8,3/8,2/8,1/8,0,1/8,2/8,3/8,4/8,5/8,6/8,7/8];
        return function(){
            return arr.pop();
        };
    })()
}).sine().dac(0.1).play();

//stepper modulates the sine() frequency