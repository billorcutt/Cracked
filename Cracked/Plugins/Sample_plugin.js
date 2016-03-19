/**
 * Foo Gain
 *
 * //example plugin
 *
 * @plugin
 * @param {Object} [params] map of optional values
 * @param {Number} [params.gain=1]
 */
cracked.Foo = function (params) {
    var userParams = params || {};
    var level = params.gain || 1;
    __().begin("Foo", userParams).gain(level).end("Foo");

    return cracked;
};
