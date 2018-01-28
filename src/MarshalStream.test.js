"use strict";

const { MarshalStream, ProtocolConstants, ProtocolType } = require(".");

test("initialize a new instance with no content", () => {
    const data = ProtocolConstants.PacketHeader;
    const stream = new MarshalStream(data);
    expect(() => stream.value).toThrow();
});

test("null content", () => {
    const data = ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.None ]));
    const stream = new MarshalStream(data);
    expect(stream.value).toEqual(null);
});

test("true bool content", () => {
    const data = ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.True ]));
    const stream = new MarshalStream(data);
    expect(stream.value).toEqual(true);
});

test("false bool content", () => {
    const data = ProtocolConstants.PacketHeader
        .concat(Buffer.from([ ProtocolType.False ]));
    const stream = new MarshalStream(data);
    expect(stream.value).toEqual(false);
});

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

test("buffer 1", () => {
    const data = Buffer.from("7e02000000150317530e7574696c6c69622e4b657956616c16052f06d15ae121eb00112705ca7e114a2c2f08008c17eb8e00d1012f0800c46410a800d101531276756c6e65726162696c6974795374617465041cb2e605117204f58cdd05113f171b0116062f0694016515eb00112705e27d114a1f130969734361706974616c041cb2e605117204f58cdd05113f2c2f08008c17eb8e00d1012f0800c46410a800d1011b02171b0116050458cca2031127051128114a2c2f08008c17eb8e00d1012f0800c46410a800d1011b02041cb2e605117204f58cdd05113f010000000200000020", "hex");
    const stream = new MarshalStream(data);
    expect(() => stream.value).not.toThrow();
});

test("some random input", () => {
    const lines = require("fs").readFileSync(require("path").join(__dirname, "..", "test", "testdata.txt")).toString().split("\n");

    for (let line of lines) {
        let ms = new MarshalStream(Buffer.from(line, "hex"));
        expect(() => {
            try {
                ms.value;
            } catch (e) {
                throw new Error(line);
            }
        }).not.toThrow();
    }
});