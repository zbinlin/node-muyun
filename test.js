"use strict";

/* eslint-env mocha */

import * as muyun from "./index.js";

import { expect } from "chai";

describe("Test getTimeOffsetBy function", () => {
    function gen(interval, offset) {
        return val => Math.floor((val - offset) / interval);
    }
    it("", () => {
        const timeStart = Math.floor(Date.now() / 1000);
        const interval = 30;
        const offset = muyun.getTimeOffsetBy(interval, timeStart);
        const base = Math.floor((timeStart - offset) / interval);
        const fn = gen(interval, offset);
        expect(fn(timeStart)).to.equal(base);
        expect(fn(timeStart + interval - 1)).to.equal(base);
        expect(fn(timeStart - 1)).to.not.equal(base);
        expect(fn(timeStart + interval)).to.not.equal(base);
    });
});

describe("Test calcPasswordFrom function", () => {
    it("", () => {
        const timeStart = Math.floor(Date.now() / 1000);
        const interval = 60;
        const offset = timeStart % interval;
        const fn = ((interval, offset) =>
            time => muyun.calcPasswordFrom(time, interval, offset))(interval, offset);
        const base = fn(timeStart);
        expect(fn(timeStart + 1)).to.equal(base);
        expect(fn(timeStart + interval - 1)).to.equal(base);
        expect(fn(timeStart - 1)).to.not.equal(base);
        expect(fn(timeStart + interval)).to.not.equal(base);
    });
});

describe("Test cipher function", () => {
    it("", async () => {
        const text = "Hello, world!";
        const phrase = "password";
        const salt = 123456;
        const expected = Buffer.from("e424f5d40f311f79e1fd959500bfe867", "hex");
        const result = await muyun.encrypt(text, phrase, salt);
        expect(result.equals(expected)).to.be.true;
    });
});

describe("Test decipher function", () => {
    it("", async () => {
        const buf = Buffer.from("e424f5d40f311f79e1fd959500bfe867", "hex");
        const phrase = "password";
        const salt = 123456;
        const expected = "Hello, world!";
        const result = await muyun.decrypt(buf, phrase, salt);
        expect(result).to.be.equal(expected);
    });
});
