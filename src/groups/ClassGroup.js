"use strict";

const { Group } = require(".");
const { ProtocolType } = require("..");
const { PyObjectEx } = require("../types");

class ClassGroup extends Group {

    static isDecoder (opcode) {
        return [
            ProtocolType.Reduce,
            ProtocolType.NewObj,
        ].includes(opcode);
    }

    static getProcessor () {
        return PyObjectEx;
    }

}

module.exports = ClassGroup;