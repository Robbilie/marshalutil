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

}

module.exports = FloatGroup;