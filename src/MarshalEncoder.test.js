"use strict";

const { MarshalEncoder, ProtocolConstants, ProtocolType } = require(".");

test("encode undefined", () => {
    const input = undefined;
    const encoder = new MarshalEncoder(input);
    expect(() => encoder.value).toThrow();
});

test("encode null", () => {
    const input = null;
    const encoder = new MarshalEncoder(input);
    expect(encoder.value).toEqual(ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.None ])));
});

test("encode true bool", () => {
    const input = true;
    const encoder = new MarshalEncoder(input);
    expect(encoder.value).toEqual(ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.True ])));
});

test("encode false bool", () => {
    const input = false;
    const encoder = new MarshalEncoder(input);
    expect(encoder.value).toEqual(ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.False ])));
});

test("encode 0", () => {
    const input = 0;
    const encoder = new MarshalEncoder(input);
    expect(encoder.value).toEqual(ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.Zero ])));
});

test("encode 1", () => {
    const input = 1;
    const encoder = new MarshalEncoder(input);
    expect(encoder.value).toEqual(ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.One ])));
});

test("encode -1", () => {
    const input = -1;
    const encoder = new MarshalEncoder(input);
    expect(encoder.value).toEqual(ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.Minusone ])));
});

/*
test("0 content", () => {
    const data = ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.Zero ]));
    const stream = new MarshalStream(data);
    expect(stream.value).toEqual(0);
});

test("1 content", () => {
    const data = ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.One ]));
    const stream = new MarshalStream(data);
    expect(stream.value).toEqual(1);
});

test("-1 content", () => {
    const data = ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.Minusone ]));
    const stream = new MarshalStream(data);
    expect(stream.value).toEqual(-1);
});

test("0xff content, int8", () => {
    const buf = Buffer.alloc(1);
    buf.writeUInt8(0xff);
    const data = ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.Int8 ]), buf);
    const stream = new MarshalStream(data);
    expect(stream.value).toEqual(0xff);
});

test("0xffff content, int16", () => {
    const buf = Buffer.alloc(2);
    buf.writeUInt16LE(0xffff);
    const data = ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.Int16 ]), buf);
    const stream = new MarshalStream(data);
    expect(stream.value).toEqual(0xffff);
});

test("0xffffffff content, int32", () => {
    const buffer = Buffer.alloc(4);
    buffer.writeUInt32LE(0xffffffff);
    const data = ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.Int32 ]), buffer);
    const stream = new MarshalStream(data);
    expect(stream.value).toEqual(0xffffffff);
});

test("empty string content, StringEmpty", () => {
    const data = ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.StringEmpty ]));
    const stream = new MarshalStream(data);
    expect(stream.value).toEqual("");
});

test("empty string content, UTF16Empty", () => {
    const data = ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.UTF16Empty ]));
    const stream = new MarshalStream(data);
    expect(stream.value).toEqual("");
});

test("StringTable content, '*corpid' 0x01", () => {
    const input = "*corpid";
    const index = ProtocolConstants.StringTable.findIndex(value => value === input);
    const data = ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.StringTable, index ]));
    const stream = new MarshalStream(data);
    expect(stream.value).toEqual(input);
});

test("string content, test", () => {
    const input = "test";
    const buffer = Buffer.from(input, "utf8");
    const data = ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.String, buffer.length ]), buffer);
    const stream = new MarshalStream(data);
    expect(stream.value).toEqual(input);
});

test("string long content, >256 ", () => {
    const test = "hjaskdfhlkajsdhfljashdlfjkasd";
    const buffer = Buffer.from(test, "utf8");
    const length = Buffer.alloc(4);
    length.writeUInt32LE(test.length);
    const data = ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.String, 0xff ]), length, buffer);
    const stream = new MarshalStream(data);
    expect(stream.value).toEqual(test);
});

// TODO: utf16/utf8 tests

test("float 0.5", () => {
    const input = 0.5;
    const buffer = Buffer.alloc(8);
    buffer.writeDoubleLE(input);
    const data = ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.Float ]), buffer);
    const stream = new MarshalStream(data);
    expect(stream.value).toEqual(input);
});

test("UInt64 1234567890", () => {
    const input = 1234567890;
    const buffer = Buffer.alloc(8);
    buffer.writeUIntLE(input, 0, 8);
    const data = ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.Int64 ]), buffer);
    const stream = new MarshalStream(data);
    expect(stream.value).toEqual(input);
});

test("long 1234567890", () => {
    const input = 1234567890;
    const buffer = Buffer.alloc(8);
    buffer.writeUIntLE(input, 0, 8);
    const data = ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.Long, buffer.length ]), buffer);
    const stream = new MarshalStream(data);
    expect(stream.value).toEqual(input);
});

test("list []", () => {
    const data = ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.ListEmpty ]));
    const stream = new MarshalStream(data);
    expect(stream.value).toEqual([]);
});

test("list [1]", () => {
    const data = ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.ListOne, ProtocolType.Int8, 0x01 ]));
    const stream = new MarshalStream(data);
    expect(stream.value).toEqual([1]);
});

test("list [1,2]", () => {
    const data = ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.List, 0x02, ProtocolType.Int8, 0x01, ProtocolType.Int8, 0x02 ]));
    const stream = new MarshalStream(data);
    expect(stream.value).toEqual([1, 2]);
});

test("tuple []", () => {
    const data = ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.TupleEmpty ]));
    const stream = new MarshalStream(data);
    expect(Object.isFrozen(stream.value)).toEqual(true);
    expect(stream.value).toEqual([]);
});

test("tuple [1]", () => {
    const data = ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.TupleOne, ProtocolType.Int8, 0x01 ]));
    const stream = new MarshalStream(data);
    expect(Object.isFrozen(stream.value)).toEqual(true);
    expect(stream.value).toEqual([1]);
});

test("tuple [1, 2]", () => {
    const data = ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.TupleTwo, ProtocolType.Int8, 0x01, ProtocolType.Int8, 0x02 ]));
    const stream = new MarshalStream(data);
    expect(Object.isFrozen(stream.value)).toEqual(true);
    expect(stream.value).toEqual([1, 2]);
});

test("tuple [1, 2, 3]", () => {
    const data = ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.Tuple, 0x03, ProtocolType.Int8, 0x01, ProtocolType.Int8, 0x02, ProtocolType.Int8, 0x03 ]));
    const stream = new MarshalStream(data);
    expect(Object.isFrozen(stream.value)).toEqual(true);
    expect(stream.value).toEqual([1, 2, 3]);
});
 */