"use strict";

const { Group } = require(".");
const { ProtocolType } = require("..");
const { PyRef } = require("../types");

class RefGroup extends Group {

    static isDecoder (opcode) {
        return opcode === ProtocolType.Ref;
    }

    static getProcessor () {
        return PyRef;
    }

}

module.exports = RefGroup;