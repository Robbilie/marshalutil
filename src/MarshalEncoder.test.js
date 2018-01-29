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

test("encode 0xff", () => {
    const input = 0xff;
    const bytes = 1;
    const encoder = new MarshalEncoder(input);
    const buffer = Buffer.alloc(bytes);
    buffer.writeUIntLE(input, 0, bytes);
    expect(encoder.value).toEqual(ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.Int8 ]), buffer));
});

test("encode 0xffff", () => {
    const input = 0xffff;
    const bytes = 2;
    const encoder = new MarshalEncoder(input);
    const buffer = Buffer.alloc(bytes);
    buffer.writeUIntLE(input, 0, bytes);
    expect(encoder.value).toEqual(ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.Int16 ]), buffer));
});

test("encode 0xffffffff", () => {
    const input = 0xffffffff;
    const bytes = 4;
    const encoder = new MarshalEncoder(input);
    const buffer = Buffer.alloc(bytes);
    buffer.writeUIntLE(input, 0, bytes);
    expect(encoder.value).toEqual(ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.Int32 ]), buffer));
});

test("encode empty string", () => {
    const input = "";
    const encoder = new MarshalEncoder(input);
    expect(encoder.value).toEqual(ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.StringEmpty ])));
});

test("encode string table entry", () => {
    const index = 2;
    const input = ProtocolConstants.StringTable[index];
    const encoder = new MarshalEncoder(input);
    expect(encoder.value).toEqual(ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.StringTable, index ])));
});

/*
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