"use strict";

const { MarshalStream, ProtocolConstants, ProtocolType } = require(".");

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

test("0xff content, int8", () => {
    const buf = Buffer.alloc(1);
    buf.writeUInt8(0xff);
    const data = ProtocolConstants.PacketHeader.concat(Buffer.from([ ProtocolType.Int8 ]), buf);
    const stream = new MarshalStream(data);
    expect(stream.value).toEqual(0xff);
});

test("0xffff content, int16", () => {
    const buf = Buffer.alloc(2);
    buf.writeUInt16LE(0xffff);
    const data = ProtocolConstants.PacketHeader.concat(Buffer.from([ ProtocolType.Int16 ]), buf);
    const stream = new MarshalStream(data);
    expect(stream.value).toEqual(0xffff);
});

test("0xffffffff content, int32", () => {
    const buf = Buffer.alloc(4);
    buf.writeUInt32LE(0xffffffff);
    const data = ProtocolConstants.PacketHeader.concat(Buffer.from([ ProtocolType.Int32 ]), buf);
    const stream = new MarshalStream(data);
    expect(stream.value).toEqual(0xffffffff);
});

test("empty string content, StringEmpty", () => {
    const data = ProtocolConstants.PacketHeader.concat(Buffer.from([ ProtocolType.StringEmpty ]));
    const stream = new MarshalStream(data);
    expect(stream.value).toEqual("");
});

test("empty string content, UTF16Empty", () => {
    const data = ProtocolConstants.PacketHeader.concat(Buffer.from([ ProtocolType.UTF16Empty ]));
    const stream = new MarshalStream(data);
    expect(stream.value).toEqual("");
});

test("StringTable content, '*corpid' 0x5d", () => {
    const data = ProtocolConstants.PacketHeader.concat(Buffer.from([ ProtocolType.StringTable, 0x01 ]));
    const stream = new MarshalStream(data);
    expect(stream.value).toEqual("*corpid");
});