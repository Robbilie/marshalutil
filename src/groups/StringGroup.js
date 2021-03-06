"use strict";

const { Group } = require(".");
const { ProtocolType } = require("..");
const { PyString } = require("../types");

class StringGroup extends Group {

    static isDecoder (opcode) {
        return [
            ProtocolType.StringEmpty,
            ProtocolType.UTF16Empty,
            ProtocolType.StringOne,
            ProtocolType.UTF16One,
            ProtocolType.String,
            ProtocolType.StringLong,
            ProtocolType.Buffer,
            ProtocolType.UTF16,
            ProtocolType.Utf8,
            ProtocolType.StringTable,
        ].includes(opcode);
    }

    static getProcessor () {
        return PyString;
    }

    static isEncoder (input) {
        return typeof(input) === "string" || input instanceof Buffer;
    }

}

module.exports = StringGroup;