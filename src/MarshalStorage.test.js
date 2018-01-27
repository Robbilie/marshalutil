"use strict";

const { MarshalStorage } = require("./");

test("return empty map when initialized with size 0", () => {
    const storage = new MarshalStorage(0, Buffer.alloc(0));
    expect(storage.getMap()).toEqual({});
});

test("return a map with the uint32le value from the buffer", () => {
    const storage = new MarshalStorage(1, Buffer.from([ 0x01, 0x00, 0x00, 0x00 ]));
    expect(storage.getMap()).toEqual({ 0: 1 });
});