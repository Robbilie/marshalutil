"use strict";

const { Marshal } = require("./");

test("validate input to be buffer", () => {
    expect(() => Marshal.validateBuffer("test")).toThrow();
});

test("validate input to be longer than 0", () => {
    expect(() => Marshal.validateBuffer(Buffer.alloc(0))).toThrow();
});

test("validate input to be marshal stream", () => {
    expect(() => Marshal.validate(Buffer.from([ 0x7e, 0x00, 0x00, 0x00, 0x00 ]))).not.toThrow();
});