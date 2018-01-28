"use strict";

const { MarshalStream, ProtocolConstants, ProtocolType } = require("./");

test("initialize a new instance with no content", () => {
    const data = ProtocolConstants.PacketHeader;
    const stream = new MarshalStream(data);
    expect(() => stream.value).toThrow();
});

test("null content", () => {
    const data = ProtocolConstants.PacketHeader.concat(Buffer.from([ ProtocolType.None ]));
    const stream = new MarshalStream(data);
    expect(stream.value).toEqual(null);
});

test("true bool content", () => {
    const data = ProtocolConstants.PacketHeader.concat(Buffer.from([ ProtocolType.True ]));
    const stream = new MarshalStream(data);
    expect(stream.value).toEqual(true);
});

test("false bool content", () => {
    const data = ProtocolConstants.PacketHeader.concat(Buffer.from([ ProtocolType.False ]));
    const stream = new MarshalStream(data);
    expect(stream.value).toEqual(false);
});

test("0 content", () => {
    const data = ProtocolConstants.PacketHeader.concat(Buffer.from([ ProtocolType.Zero ]));
    const stream = new MarshalStream(data);
    expect(stream.value).toEqual(0);
});

test("1 content", () => {
    const data = ProtocolConstants.PacketHeader.concat(Buffer.from([ ProtocolType.One ]));
    const stream = new MarshalStream(data);
    expect(stream.value).toEqual(1);
});

test("-1 content", () => {
    const data = ProtocolConstants.PacketHeader.concat(Buffer.from([ ProtocolType.Minusone ]));
    const stream = new MarshalStream(data);
    expect(stream.value).toEqual(-1);
});