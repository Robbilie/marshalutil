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

    static getDecoder () {
        return PyInt;
    }

}

module.exports = IntGroup;