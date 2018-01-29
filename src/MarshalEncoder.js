"use strict";

const { Marshal } = require(".");
const GROUPS = [...require("./groups")];

class MarshalEncoder extends Marshal {

    constructor (input) {
        super();
        this._input = input;
    }

    process () {
        return
    }

    getEncoder () {
        const group = GROUPS.find(processor => processor.isEncoder(opcode));
        if (group === undefined)
            throw new Error(`NoEncoderException: 0x${opcode.toString(16).padStart(2, "0")}`);
        return group.getProcessor();
    }

}

module.exports = MarshalEncoder;