"use strict";

const { MarshalStream } = require("./");

test("initialize a new instance with no content", () => {
    const data = Buffer.from([ 0x7e, 0x00, 0x00, 0x00, 0x00 ]);
    const stream = new MarshalStream(data);
    expect(stream.value).toEqual(undefined);
});