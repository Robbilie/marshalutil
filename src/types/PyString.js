"use strict";

const { PyObject } = require(".");
const { ProtocolType, ProtocolConstants } = require("..");

class PyString extends PyObject {

    decode (marshal, opcode) {
        if ([ProtocolType.StringEmpty, ProtocolType.UTF16Empty].includes(opcode))
            return "";
        if (opcode === ProtocolType.StringTable)
            return ProtocolConstants.StringTable[marshal.getInt(1)];

        let encoding = undefined;
        if ([ProtocolType.UTF16, ProtocolType.UTF16One].includes(opcode)) {
            encoding = "utf16le";
        } else if (opcode === ProtocolType.Utf8) {
            encoding = "utf8";
        }

        if ([ProtocolType.StringLong, ProtocolType.String, ProtocolType.Buffer, ProtocolType.UTF16, ProtocolType.Utf8]) {
            const length = marshal.getLength();
            const buffer = marshal.getBytes(length);
            if (encoding) {
                return buffer.toString(encoding);
            } else if (buffer.toString().isASCII()) {
                return buffer.toString();
            } else {
                return buffer;
            }
        }
    }

}

module.exports = PyString;