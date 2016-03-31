//gertrude stein's voice modulating the frequency of a sine
__().sampler({
  		path:"/Sounds/various/stein.mp3",
  		loop:"true",
  		speed:3/4
}).gain({modulates:"frequency",gain:10000}).sine(1).dac();

//sampler output modulates its own speed
__("sampler").gain({modulates:"speed",gain:2}).connect("sampler");

//make horrible noise
__.play()