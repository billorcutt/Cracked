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

//running at 1/4 speed

__().
    sampler({
        path:"../../Sounds/various/gun-cock.wav",
        loop:"true",
        speed:.25
    }).
    dac();

//set the speed of the sampler
//uncomment to see it in action
//__("sampler").speed(2)

__("sampler").start();