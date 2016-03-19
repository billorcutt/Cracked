/**
 * Attack Decay Sustain Release envelope
 *
 * @plugin
 * @param {Array} [userParams] 5 values: attack,decay,sustain,hold,release
 * @param {Array}  [userParams] 4 values: attack,decay,sustain,release
 * @param {Array} [userParams] 3 values: attack,decay,sustain (holds until released)
 * @param {String} [userParams] "slow" or "fast"
 * @param {Number} [userParams=0.5] length of the total envelope
 */

//short cut parameter : "fast" or "slow" (.25 or 1)
__().sine(120).adsr({id:"a4"}).dac(0.25);
__().square(5).adsr({id:"a3"}).connect("dac").play();

setInterval(function(){
	__("#a4").adsr("trigger","fast");
},500);

setInterval(function(){
	__("#a3").adsr("trigger","slow");
},2000);