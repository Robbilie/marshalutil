"use strict";

const { Group } = require(".");
const { ProtocolType } = require("..");
const { PyLong } = require("../types");

class LongGroup extends Group {

    static isDecoder (opcode) {
        return [
            ProtocolType.Int64,
            ProtocolType.Long,
        ].includes(opcode);
    }

    static getProcessor () {
        return PyLong;
    }

    static isEncoder (input) {
        if (typeof(input) !== "number")
            return false;
        if (input % 1 === 0 && input > 0xffffffff)
            return true;
    }

}

module.exports = LongGroup;