/**
 * Panner - simple stereo panner
 *
 * @plugin
 * @category Miscellaneous
 * @param {Object} [params] map of optional values
 * @function
 * @memberof cracked
 * @name cracked#panner
 * @public
 */

//pans left & right. arguments: 1=right, -1=left, 0=both. defaults to 0.

__().saw(100).panner().dac(0.25).play();

setTimeout(function(){
    __("panner").pan(1);
},500);

setTimeout(function(){
    __("panner").pan(-1);
},1000);

setTimeout(function(){
    __("panner").pan(1);
},1500);

setTimeout(function(){
    __("panner").pan(-1);
},2000);

setTimeout(function(){
    __("panner").pan(1);
},2500);

setTimeout(function(){
    __("panner").pan(0);
},3000);

setTimeout(function(){
    __("*").stop();
},3500);