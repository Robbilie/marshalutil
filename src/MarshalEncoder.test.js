"use strict";

const { MarshalEncoder } = require(".");

test("encode undefined", () => {
    const input = undefined;
    const encoder = new MarshalEncoder(input);
    expect(() => encoder.value).toThrow();
});