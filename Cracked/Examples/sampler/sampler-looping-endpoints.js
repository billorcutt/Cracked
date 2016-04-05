/**
 * Sampler - sound file player
 *
 * @plugin
 * @param {Object} [userParams] map of optional values
 * @param {Number} [userParams.speed=1]
 * @param {Number} [userParams.start=1]
 * @param {Number} [userParams.end=1]
 * @param {String} [userParams.path=''] path to sound file to play
 * @param {Boolean} [userParams.loop=false]
 */

//same as above but with specified loop points

__().
    sampler({
        path:"../../Sounds/various/gun-cock.wav",
        loop:"true",
        speed:0.25,
        start:0.35,
        end:0.4
    }).
    dac();

//let the sample load
setTimeout(function(){
    __("sampler").start();
},500);


//setting the sampler speed
//uncommnent this line see it in action
//__("sampler").speed(0.1);