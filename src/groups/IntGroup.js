"use strict";

const { Group } = require(".");
const { ProtocolType } = require("..");
const { PyInt } = require("../types");

class IntGroup extends Group {

    static isDecoder (opcode) {
        return [
            ProtocolType.Zero,
            ProtocolType.One,
            ProtocolType.Minusone,
            ProtocolType.Int8,
            ProtocolType.Int16,
            ProtocolType.Int32,
        ].includes(opcode);
    }

    static getProcessor () {
        return PyInt;
    }

    static isEncoder (input) {
        if (typeof(input) !== "number")
            return false;
        if ([-1, 0, 1].includes(input))
            return true;
        if (input % 1 === 0 && input >= 0 && input <= 0xffffffff)
            return true;
    }

}

module.exports = IntGroup;