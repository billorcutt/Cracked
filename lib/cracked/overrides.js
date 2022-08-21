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
 * ls - read a directory and return an array of its contents
 *
 * @param {String} [params.path] path to directory to read
 */
cracked.ls = function(path) {
    if(path && typeof window.parent.readDirectory === "function") {
        return window.parent.readDirectory(path);
    }
};

/**
 * writeMidiFile - first draft, takes an array of notes and a note value, writes a file
 *
 * @param {String} [params.path] path to directory to read
 */
 cracked.writeMidiFile = function(midiArray,noteLen) {
    if(midiArray && noteLen && typeof window.parent.writeMidiFile === "function") {
        return window.parent.writeMidiFile(midiArray,noteLen);
    }
};

/**
 * expose the method to reload/re-eval the editor
 */
cracked.reload = window.parent.evalEditor;

/**
 * shared_object - shared object between windows
 */
cracked.shared_object = window.parent._shared_object;

/**
 * expose window id
 */
cracked.window_id = window.parent._windowId;

/**
 * Monome stuff below
 */
cracked.monome_init = function(cb) {
    if(!window.parent.monome_device || !window.parent.monome_device.ready) {
        window.parent._monome_init();
    }
    if(typeof cb === "function") {
        cb();
    }
};

cracked.monome_reset_display = function() {
    for(var i=0;i<8;i++) {
        for(var j=0;j<8;j++) {
            __.monome_led_off(i,j);
        }
    }
};

cracked.monome_led_on = function(x,y) {
    if(window.parent.monome_device && window.parent.monome_device.ready) {
        if(!__.isUndef(x) && !__.isUndef(y)) {
            window.parent._monome_led_on(x,y);
        }
    }
};

cracked.monome_led_off = function(x,y) {
    if(window.parent.monome_device && window.parent.monome_device.ready) {
        if(!__.isUndef(x) && !__.isUndef(y)) {
            window.parent._monome_led_off(x, y);
        }
    }
};

cracked.monome_led_blink = function(x,y,time) {
    if(window.parent.monome_device && window.parent.monome_device.ready) {
        if(!__.isUndef(x) && !__.isUndef(y)) {
            var t = time || 90;
            window.parent._monome_led_on(x,y);
            setTimeout(function(){
                cracked.monome_led_off(x,y);
            },t);
        }
    }
};

cracked.monome_press = function(cb) {
    if(window.parent.monome_device && window.parent.monome_device.ready && typeof cb === 'function') {
        window.parent._monome_key_press(cb);
    }
};

cracked.monome_increment = function(num) {
    if(num+1<8) {
        return num+1;
    } else {
        return 0;
    }
};

cracked.monome_set_led = function(x,y,s) {
    if(s) {
        __.monome_led_on(x,y);
    } else {
        __.monome_led_off(x,y);
    }
};

cracked.monome_led_set_column_range = function(x,y_start,y_end,s) {
    for(var i=y_start;i<=y_end;i++) {
        __.monome_set_led(x,i,s);
    }
};

cracked.monome_led_set_row_range = function(y,x_start,x_end,s) {
    for(var i=x_start;i<=x_end;i++) {
        __.monome_set_led(i,y,s);
    }
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