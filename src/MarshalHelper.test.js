"use strict";

const { MarshalHelper } = require(".");

test("validate input to be buffer", () => {
    expect(() => MarshalHelper.validateBuffer("test")).toThrow();
});

test("validate input to be longer than 0", () => {
    expect(() => MarshalHelper.validateBuffer(Buffer.alloc(0))).toThrow();
});

test("validate input to be marshal stream", () => {
    expect(() => MarshalHelper.validate(Buffer.from([ 0x7e, 0x00, 0x00, 0x00, 0x00 ]))).not.toThrow();
});