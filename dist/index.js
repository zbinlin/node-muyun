'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var crypto = require('crypto');
var util = require('util');

/**
 * @param {string|Buffer} phrase
 * @param {string} salt
 * @param {string}
 */
let createPasswordBy = (() => {
    var _ref = _asyncToGenerator(function* (phrase, salt) {
        const hmac = crypto.createHmac("sha256", phrase);
        const pw = yield wrapStream(hmac)(Buffer.from(String(salt), "utf8"));
        return pw.toString("hex");
    });

    return function createPasswordBy(_x, _x2) {
        return _ref.apply(this, arguments);
    };
})();

/**
 * @param {number}
 * @param {Date|number} [timestamp=Date.now()]
 * @return {Object}
 * @property {number} interval
 * @property {number} base
 * @property {number} offset
 */


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const ALG_C = "aes192";

/**
 * @param {Stream} stream
 * @return {Function<Promise<Buffer, Error>>}
 */
function wrapStream(stream) {
    return buffer => {
        return new Promise((resolve, reject) => {
            const buffers = [];
            buffers.size = 0;
            stream.on("data", data => {
                buffers.push(data);
                buffers.size += data.length;
            });
            stream.on("end", () => {
                resolve(Buffer.concat(buffers, buffers.size));
            });
            stream.on("error", reject);
            stream.end(buffer);
        });
    };
}function getTimeOffsetBy(interval, timestamp = Date.now()) {
    if (timestamp instanceof Date) {
        timestamp = Math.floor(timestamp.getTime() / 1000);
    }
    return timestamp % interval;
}

/**
 * @param {number} timestamp
 * @param {number} interval
 * @param {number} offset
 * @return {number}
 */
function getSameValueFromTimeInterval(timestamp, interval, offset) {
    if (timestamp instanceof Date) {
        timestamp = Math.floor(timestamp.getTime() / 1000);
    }
    return Math.floor((timestamp - offset) / interval) * (interval - offset);
}
const calcPasswordFrom = util.deprecate(getSameValueFromTimeInterval, "calcPasswordFrom was deprecated, please use getSameValueFromTimeInterval instaead.");

/**
 * @param {string} str
 * @param {string|Buffer} phrase
 * @param {string} salt
 * @return {Buffer}
 */
let encrypt = (() => {
    var _ref2 = _asyncToGenerator(function* (str, phrase, salt) {
        const password = yield createPasswordBy(phrase, salt);
        const cipher = crypto.createCipher(ALG_C, password);
        return yield wrapStream(cipher)(Buffer.from(str, "utf8"));
    });

    return function encrypt(_x3, _x4, _x5) {
        return _ref2.apply(this, arguments);
    };
})();

/**
 * @param {Buffer} buffer
 * @param {string|Buffer} phrase
 * @param {string} salt
 * @return {string}
 */
let decrypt = (() => {
    var _ref3 = _asyncToGenerator(function* (buffer, phrase, salt) {
        const password = yield createPasswordBy(phrase, salt);
        const decipher = crypto.createDecipher(ALG_C, password);
        const newBuffer = yield wrapStream(decipher)(buffer);
        return newBuffer.toString("utf8");
    });

    return function decrypt(_x6, _x7, _x8) {
        return _ref3.apply(this, arguments);
    };
})();

exports.getTimeOffsetBy = getTimeOffsetBy;
exports.getSameValueFromTimeInterval = getSameValueFromTimeInterval;
exports.calcPasswordFrom = calcPasswordFrom;
exports.encrypt = encrypt;
exports.decrypt = decrypt;
//# sourceMappingURL=index.js.map
