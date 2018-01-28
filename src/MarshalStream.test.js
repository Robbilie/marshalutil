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
    const data = Buffer.from("7e00000000171333636172626f6e2e636f6d6d6f6e2e7363726970742e6e65742e6f626a65637443616368696e672e4361636865644f626a65637414072c2f0811ddf8617200d101056e110104fabb1100092b5a7e03000000160217530e7574696c6c69622e4b657956616c16021f530a696e6372656173696e670a9a999921e91b83415306706f696e7473053006171b011602201b022f0428df6b031b03052f06010000000200000003000000081403130b4d6574686f642043616c6c2e067365727665721403130f646576496e6465784d616e61676572131e476574446576656c6f706d656e74496e6469636573466f7253797374656d04e0c7c90120", "hex");
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