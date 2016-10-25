"use strict";

import * as crypto from "crypto";

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
}

/**
 * @param {string} phrase
 * @param {string} salt
 * @param {string}
 */
async function createPasswordBy(phrase, salt) {
    const hmac = crypto.createHmac("sha256", phrase);
    const pw = await wrapStream(hmac)(Buffer.from(String(salt), "utf8"));
    return pw.toString("hex");
}


/**
 * @param {number}
 * @param {Date|number} [timestamp=Date.now()]
 * @return {Object}
 * @property {number} interval
 * @property {number} base
 * @property {number} offset
 */
export function getTimeOffsetBy(interval, timestamp = Date.now()) {
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
export function calcPasswordFrom(timestamp, interval, offset) {
    if (timestamp instanceof Date) {
        timestamp = Math.floor(timestamp.getTime() / 1000);
    }
    return Math.floor((timestamp - offset) / interval) * (interval - offset);
}

/**
 * @param {string} str
 * @param {string} phrase
 * @param {string} salt
 * @return {Buffer}
 */
export async function encrypt(str, phrase, salt) {
    const password = await createPasswordBy(phrase, salt);
    const cipher = crypto.createCipher(ALG_C, password);
    return await wrapStream(cipher)(Buffer.from(str, "utf8"));
}

/**
 * @param {Buffer} buffer
 * @param {string} phrase
 * @param {string} salt
 * @return {string}
 */
export async function decrypt(buffer, phrase, salt) {
    const password = await createPasswordBy(phrase, salt);
    const decipher = crypto.createDecipher(ALG_C, password);
    const newBuffer = await wrapStream(decipher)(buffer);
    return newBuffer.toString("utf8");
}
