"use strict";

require("./extendings");
const { Marshal, ProtocolConstants } = require(".");
const { PyObject } = require("./types");
const GROUPS = [...require("./groups")];

class MarshalEncoder extends Marshal {

    constructor (input) {
        super();
        this._input = input;
    }

    process () {
        const data = this.processType(this._input);
        return ProtocolConstants.PacketHeader.concat(data);
    }

    processType (input) {
        if (input instanceof PyObject)
            return input.encode(this, input.valueOf());
        const encoder = this.getEncoder(input);
        if (encoder === undefined)
            throw new Error(`NoEncoderException: ${typeof(input)}`);
        return this.encode(encoder, input);
    }

    getEncoder (input) {
        const group = GROUPS.find(processor => processor.isEncoder(input));
        if (group === undefined)
            throw new Error(`NoEncoderException: ${typeof(input)}`);
        return group.getProcessor();
    }

    encode (T, input) {
        const instance = new T();
        return instance.encode(this, input);
    }

}

module.exports = MarshalEncoder;