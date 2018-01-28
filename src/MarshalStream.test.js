"use strict";

const { MarshalStream, ProtocolConstants, ProtocolType } = require("./");

test("initialize a new instance with no content", () => {
    const data = ProtocolConstants.PacketHeader;
    const stream = new MarshalStream(data);
    expect(() => stream.value).toThrow();
});

test("initialize a new instance with null content", () => {
    const data = ProtocolConstants.PacketHeader.concat(Buffer.from([ ProtocolType.None ]));
    const stream = new MarshalStream(data);
    expect(stream.value).toEqual(null);
});

test("initialize a new instance with true bool content", () => {
    const data = ProtocolConstants.PacketHeader.concat(Buffer.from([ ProtocolType.True ]));
    const stream = new MarshalStream(data);
    expect(stream.value).toEqual(true);
});