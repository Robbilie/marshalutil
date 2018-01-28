"use strict";

const { ProtocolConstants, Marshal, MarshalStorage } = require(".");
const GROUPS = [...require("./groups")];

class MarshalStream {

    constructor (buffer) {
        this._initialized = false;
        this._output = null;
        this._needObjectEx = false;
        this._stream = Marshal.createStream(buffer);
        this._storage = this.setupStorage();
    }

    setupStorage () {
        const size = this.getInt(4);
        const data = this.getStream().slice(-(size * 4));
        return new MarshalStorage(size, data);
    }

    get value () {
        if (this._initialized === false)
            this._output = this.process();
        return this._output;
    }

    process () {
        const { opcode, shared } = this.getTypeAndShared();
        const result = this.processType(opcode);
        if (shared === true)
            this.storeResult(result);
        return result;
    }

    processType (opcode) {
        const decoder = this.getDecoder(opcode);
        if (decoder === undefined)
            throw new Error(`MissingDecoderException: 0x${opcode.toString(16).padStart(2, "0")}`);
        return this.decode(decoder, opcode);
    }

    getDecoder (opcode) {
        const group = GROUPS.find(processor => processor.isDecoder(opcode));
        if (group === undefined)
            throw new Error("NoDecoderException");
        return group.getDecoder();
    }

    decode (T, opcode) {
        const instance = new T();
        return instance.decode(this, opcode);
    }

    storeResult (result) {
        this.getStorage().store(result);
    }

    getTypeAndShared () {
        let opcode = this.getInt(1);
        let shared = (opcode & ProtocolConstants.SharedFlag) === ProtocolConstants.SharedFlag;
        opcode &= ~ProtocolConstants.SharedFlag;
        return { opcode, shared };
    }

    getInt (bytesToRead = 1) {
        const bytes = Buffer.alloc(4);
        this.getBytes(bytesToRead).copy(bytes);
        return bytes.readUInt32LE();
    }

    getBytes (bytesToRead) {
        return this.getStream().read(bytesToRead);
    }


    getLength () {
        let length = this.getInt(1);
        if (length === 0xff)
            length = this.getInt(4);
        return length;
    }

    getStream () {
        return this._stream;
    }

    getStorage () {
        return this._storage;
    }

}

module.exports = MarshalStream;