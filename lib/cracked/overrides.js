//This file has modules that override the main library

/**
 * Sampler - sound file player
 *
 * [See more sampler examples](../../examples/sampler.html)
 *
 * @plugin
 * @param {Object} [userParams] map of optional values
 * @param {Number} [userParams.speed=1]
 * @param {Number} [userParams.start=1]
 * @param {Number} [userParams.end=1]
 * @param {Boolean} [userParams.loop=false]
 */
cracked.sampler = function (userParams) {
    //sampler only plays sound files not data from functions
    if (userParams && userParams.path) {
        //resolve path to file
        userParams.path = window.parent.resolvePath(userParams.path);
        __.begin("sampler", userParams).buffer(userParams).end("sampler");
    }
    return cracked;
};

/**
 * Convolver Reverb
 *
 * [See more reverb examples](../../examples/delay.html)
 *
 * @plugin
 * @param {Object} [params] map of optional values
 * @param {Boolean} [params.reverse=false] reverse reverb
 * @param {String} [params.path] path to impulse file. if no path, impulse is generated.
 * @param {Number} [params.seconds=3] if generated impulse, length in seconds.
 * @param {Number} [params.decay=2] if generated impulse, length of decay in seconds
 * @param {Function} [params.fn=buildImpulse] custom function to generate an impulse buffer
 */

cracked.reverb = function (params) {

    params = __.ifUndef(params, {});

    //if there's no path to an impulse
    //then generate our own
    if (!params.path) {
        params.fn = params.fn || buildImpulse;
    } else {
        params.path = window.parent.resolvePath(params.path);
    }

    //if building an impulse
    var _seconds = __.ifUndef(params.seconds, 3);
    var _reverse = __.ifUndef(params.reverse, false);
    var _decay = __.ifUndef(params.decay, 2);

    __.begin("reverb", params).convolver(params).end("reverb");

    //default method to generate an impules
    function buildImpulse(audioContext) {

        var rate = audioContext.sampleRate,
            length = rate * _seconds,
            decay = _decay,
            impulse = audioContext.createBuffer(2, length, rate),
            impulseL = impulse.getChannelData(0),
            impulseR = impulse.getChannelData(1),
            n, i;

        for (i = 0; i < length; i++) {
            n = _reverse ? length - i : i;
            impulseL[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
            impulseR[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
        }
        return impulse;
    }

    return cracked;

};