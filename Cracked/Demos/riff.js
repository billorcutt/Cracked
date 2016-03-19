//sub audio frequency, overdriven square waves

var div = 2;

__().square(4/div).lowpass({frequency:200,q:40}).overdrive().gain({id:"g1",gain:5}).dac(0.25);

__().sine(100/div).gain(2).connect("overdrive");

__().square(1/div).lowpass({frequency:100,q:60}).gain(2).connect("overdrive");

__().square(4/div).highpass({frequency:5000,q:20}).gain(0.25).connect("#g1");

__.play();








