'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _regeneratorRuntime = _interopDefault(require('babel-runtime/regenerator'));
var crypto = require('crypto');
var util = require('util');

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();



var asyncToGenerator = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};











var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

/**
 * @param {string} phrase
 * @param {string} salt
 * @param {string}
 */
var createPasswordBy = function () {
    var _ref = asyncToGenerator(_regeneratorRuntime.mark(function _callee(phrase, salt) {
        var hmac, pw;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        hmac = crypto.createHmac("sha256", phrase);
                        _context.next = 3;
                        return wrapStream(hmac)(Buffer.from(String(salt), "utf8"));

                    case 3:
                        pw = _context.sent;
                        return _context.abrupt("return", pw.toString("hex"));

                    case 5:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function createPasswordBy(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

/**
 * @param {number}
 * @param {Date|number} [timestamp=Date.now()]
 * @return {Object}
 * @property {number} interval
 * @property {number} base
 * @property {number} offset
 */


var ALG_C = "aes192";

/**
 * @param {Stream} stream
 * @return {Function<Promise<Buffer, Error>>}
 */
function wrapStream(stream) {
    return function (buffer) {
        return new Promise(function (resolve, reject) {
            var buffers = [];
            buffers.size = 0;
            stream.on("data", function (data) {
                buffers.push(data);
                buffers.size += data.length;
            });
            stream.on("end", function () {
                resolve(Buffer.concat(buffers, buffers.size));
            });
            stream.on("error", reject);
            stream.end(buffer);
        });
    };
}function getTimeOffsetBy(interval) {
    var timestamp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Date.now();

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
var calcPasswordFrom = util.deprecate(getSameValueFromTimeInterval, "calcPasswordFrom was deprecated, please use getSameValueFromTimeInterval instaead.");

/**
 * @param {string} str
 * @param {string} phrase
 * @param {string} salt
 * @return {Buffer}
 */
var encrypt = function () {
    var _ref2 = asyncToGenerator(_regeneratorRuntime.mark(function _callee2(str, phrase, salt) {
        var password, cipher;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return createPasswordBy(phrase, salt);

                    case 2:
                        password = _context2.sent;
                        cipher = crypto.createCipher(ALG_C, password);
                        _context2.next = 6;
                        return wrapStream(cipher)(Buffer.from(str, "utf8"));

                    case 6:
                        return _context2.abrupt("return", _context2.sent);

                    case 7:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function encrypt(_x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
    };
}();

/**
 * @param {Buffer} buffer
 * @param {string} phrase
 * @param {string} salt
 * @return {string}
 */
var decrypt = function () {
    var _ref3 = asyncToGenerator(_regeneratorRuntime.mark(function _callee3(buffer, phrase, salt) {
        var password, decipher, newBuffer;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return createPasswordBy(phrase, salt);

                    case 2:
                        password = _context3.sent;
                        decipher = crypto.createDecipher(ALG_C, password);
                        _context3.next = 6;
                        return wrapStream(decipher)(buffer);

                    case 6:
                        newBuffer = _context3.sent;
                        return _context3.abrupt("return", newBuffer.toString("utf8"));

                    case 8:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function decrypt(_x7, _x8, _x9) {
        return _ref3.apply(this, arguments);
    };
}();

exports.getTimeOffsetBy = getTimeOffsetBy;
exports.getSameValueFromTimeInterval = getSameValueFromTimeInterval;
exports.calcPasswordFrom = calcPasswordFrom;
exports.encrypt = encrypt;
exports.decrypt = decrypt;
//# sourceMappingURL=index.js.map
