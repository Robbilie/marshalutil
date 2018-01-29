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
    expect(encoder.value).toEqual(ProtocolConstants.PacketHeader.concat(Buffer.from([ ProtocolType.None ])))
});