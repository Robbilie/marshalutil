"use strict";

const { Group } = require(".");
const { ProtocolType } = require("..");
const { PyFloat } = require("../types");

class FloatGroup extends Group {

    static isDecoder (opcode) {
        return [
            ProtocolType.Float,
            ProtocolType.FloatEmpty,
        ].includes(opcode);
    }

    static getProcessor () {
        return PyFloat;
    }

    static isEncoder (input) {
        if (typeof(input) !== "number")
            return false;
        if (input % 1 !== 0)
            return true;
    }

}

module.exports = FloatGroup;