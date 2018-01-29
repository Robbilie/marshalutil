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
        return [
            input === 0,
        ].includes(true);
    }

}

module.exports = IntGroup;