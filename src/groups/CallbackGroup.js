"use strict";

const { Group } = require(".");
const { ProtocolType } = require("..");
const { PyCallback } = require("../types");

class CallbackGroup extends Group {

    static isDecoder (opcode) {
        return opcode === ProtocolType.Callback;
    }

    static getProcessor () {
        return PyCallback;
    }

}

module.exports = CallbackGroup;