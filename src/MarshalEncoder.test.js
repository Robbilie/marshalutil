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

test("encode 0x05", () => {
    const input = 0x05;
    const bytes = 1;
    const encoder = new MarshalEncoder(input);
    const buffer = Buffer.alloc(bytes);
    buffer.writeIntLE(input, 0, bytes);
    expect(encoder.value).toEqual(ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.Int8 ]), buffer));
});

test("encode 0x0555", () => {
    const input = 0x0555;
    const bytes = 2;
    const encoder = new MarshalEncoder(input);
    const buffer = Buffer.alloc(bytes);
    buffer.writeIntLE(input, 0, bytes);
    expect(encoder.value).toEqual(ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.Int16 ]), buffer));
});

test("encode 0x05555555", () => {
    const input = 0x05555555;
    const bytes = 4;
    const encoder = new MarshalEncoder(input);
    const buffer = Buffer.alloc(bytes);
    buffer.writeIntLE(input, 0, bytes);
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

test("encode string 't'", () => {
    const input = "t";
    const buffer = Buffer.from(input);
    const encoder = new MarshalEncoder(input);
    expect(encoder.value).toEqual(ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.StringOne ]), buffer));
});

test("encode string 'test'", () => {
    const input = "test";
    const buffer = Buffer.from(input);
    const encoder = new MarshalEncoder(input);
    expect(encoder.value).toEqual(ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.String, buffer.length ]), buffer));
});

test("encode string with length >256", () => {
    const input = `testtesttesttesttesttesttesttesttesttesttesttesttesttestte
    sttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttes
    ttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest
    testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttestt
    esttesttesttesttesttesttesttesttesttesttest`;
    const buffer = Buffer.from(input);
    const length = Buffer.alloc(4);
    length.writeUInt32LE(buffer.length);
    const encoder = new MarshalEncoder(input);
    expect(encoder.value).toEqual(ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.String, 0xff ]), length, buffer));
});

// TODO: utf16/utf8 tests

test("encode float 0.5", () => {
    const input = 0.5;
    const buffer = Buffer.alloc(8);
    buffer.writeDoubleLE(input, 0);
    const encoder = new MarshalEncoder(input);
    expect(encoder.value).toEqual(ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.Float ]), buffer));
});

test("encode long 1234567890123", () => {
    const input = 1234567890123;
    const buffer = Buffer.alloc(8);
    buffer.writeUIntLE(input, 0, 8);
    const encoder = new MarshalEncoder(input);
    expect(encoder.value).toEqual(ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.Long, buffer.length ]), buffer));
});

test("encode list []", () => {
    const input = [];
    const encoder = new MarshalEncoder(input);
    expect(encoder.value).toEqual(ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.ListEmpty ])));
});

test("encode list [1]", () => {
    const input = [1];
    const encoder = new MarshalEncoder(input);
    expect(encoder.value).toEqual(ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.ListOne, ProtocolType.One ])));
});

test("encode list [1, -1]", () => {
    const input = [1, -1];
    const encoder = new MarshalEncoder(input);
    expect(encoder.value).toEqual(ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.List, input.length, ProtocolType.One, ProtocolType.Minusone ])));
});

test("encode tuple []", () => {
    const input = [].freeze();
    const encoder = new MarshalEncoder(input);
    expect(encoder.value).toEqual(ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.TupleEmpty ])));
});

test("encode tuple [1]", () => {
    const input = [1].freeze();
    const encoder = new MarshalEncoder(input);
    expect(encoder.value).toEqual(ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.TupleOne, ProtocolType.One ])));
});

test("encode tuple [1, -1]", () => {
    const input = [1, -1].freeze();
    const encoder = new MarshalEncoder(input);
    expect(encoder.value).toEqual(ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.TupleTwo, ProtocolType.One, ProtocolType.Minusone ])));
});

test("encode tuple [-1, 0, 1]", () => {
    const input = [-1, 0, 1].freeze();
    const encoder = new MarshalEncoder(input);
    expect(encoder.value).toEqual(ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.Tuple, input.length, ProtocolType.Minusone, ProtocolType.Zero, ProtocolType.One ])));
});

// TODO: Dict test



test("encode dict { 'test': 1 }", () => {
    const input = { test: 1 };
    const encoder = new MarshalEncoder(input);
    expect(encoder.value).toEqual(ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.Dict, 0x01, ProtocolType.One, ProtocolType.String, 0x04 ]), Buffer.from("test")));
});