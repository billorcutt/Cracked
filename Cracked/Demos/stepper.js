__().dac(0.75);

__().stepper({steps:16,length:2,modulates:"detune"}).sine(120).gain(0.25).connect("dac");

__().square(1/4).lowpass({frequency:80,q:30}).connect("dac");

__().square(1/2).delay(0.5).connect("dac");

__().square({frequency:8/2,id:"hh"}).highpass({frequency:8500,q:40}).connect("dac");

__("#hh").delay({id:"dl1",delay:1/16,feedback:1}).connect("highpass");

__().stepper({gain:1,modulates:"delay",steps:2,length:4,fn:(function(){
    var arr = [1/8,1/16];
    return function() {
        return arr.pop();
    }
})()}).connect("#dl1");

__().lfo({modulates:"feedback",gain:1.5,frequency:1/8}).connect("#dl1");

__.play();