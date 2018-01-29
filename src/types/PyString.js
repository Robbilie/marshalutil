"use strict";

const { PyObject } = require(".");
const { ProtocolType, ProtocolConstants } = require("..");

class PyString extends PyObject {

    decode (marshal, opcode) {
        if ([ProtocolType.StringEmpty, ProtocolType.UTF16Empty].includes(opcode))
            return "";
        if (opcode === ProtocolType.StringTable)
            return ProtocolConstants.StringTable[marshal.getInt(1)];

        const encoding = PyString.getEncoding(opcode);

        if ([ProtocolType.StringLong, ProtocolType.String, ProtocolType.Buffer, ProtocolType.UTF16, ProtocolType.Utf8]) {
            const length = marshal.getLength();
            const buffer = marshal.getBytes(length);
            const str = buffer.toString(encoding);
            if (encoding || str.isASCII()) {
                return str;
            } else {
                return buffer;
            }
        }
    }

    static getEncoding (opcode) {
        if ([ProtocolType.UTF16, ProtocolType.UTF16One].includes(opcode)) {
            return "utf16le";
        } else if (opcode === ProtocolType.Utf8) {
            return "utf8";
        }
    }

    encode (marshal, input) {
        if (input === "")
            return Buffer.from([ ProtocolType.StringEmpty ]);
    }

}

module.exports = PyString;