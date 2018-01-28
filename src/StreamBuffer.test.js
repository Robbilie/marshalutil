"use strict";

const { StreamBuffer } = require(".");

test("stream buffer to read bytes", () => {
    const buffer = Buffer.from([ 1, 2, 3, 4 ]);
    const stream = new StreamBuffer(buffer);
    expect(stream.read(1)).toEqual(Buffer.from([ 1 ]));
    expect(stream.read(1)).toEqual(Buffer.from([ 2 ]));
    expect(stream.read(1)).toEqual(Buffer.from([ 3 ]));
    expect(stream.read(1)).toEqual(Buffer.from([ 4 ]));
});

test("stream buffer to return empty buffer when end is reached", () => {
    const buffer = Buffer.from([ 1, 2 ]);
    const stream = new StreamBuffer(buffer);
    expect(stream.read(1)).toEqual(Buffer.from([ 1 ]));
    expect(stream.read(1)).toEqual(Buffer.from([ 2 ]));
    expect(stream.read(1)).toEqual(Buffer.alloc(0));
});

test("stream buffer to start at beginning when rewinded", () => {
    const buffer = Buffer.from([ 1, 2 ]);
    const stream = new StreamBuffer(buffer);
    expect(stream.read(1)).toEqual(Buffer.from([ 1 ]));
    expect(stream.read(1)).toEqual(Buffer.from([ 2 ]));
    stream.rewind();
    expect(stream.read(1)).toEqual(Buffer.from([ 1 ]));
});