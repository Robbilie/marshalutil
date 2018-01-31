"use strict";

const { PyObject } = require(".");
const { ProtocolType, ProtocolConstants, MarshalHelper } = require("..");

class PyString extends PyObject {

    decode (marshal, opcode) {
        if ([ProtocolType.StringEmpty, ProtocolType.UTF16Empty].includes(opcode))
            return "";
        if (opcode === ProtocolType.StringTable)
            return ProtocolConstants.StringTable[marshal.getInt(1)];

        const encoding = PyString.getEncoding(opcode);

        let length = opcode === ProtocolType.UTF16One ? 2 : 1;
        if ([
            ProtocolType.StringLong,
            ProtocolType.String,
            ProtocolType.Buffer,
            ProtocolType.UTF16,
            ProtocolType.Utf8,
        ].includes(opcode))
            length = marshal.getLength();

        const buffer = marshal.getBytes(length);
        const str = buffer.toString(encoding);
        if (encoding || str.isASCII()) {
            return str;
        } else {
            return buffer;
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
        const index = ProtocolConstants.StringTable.indexOf(input);
        if (index >= 0)
            return Buffer.from([ ProtocolType.StringTable, index ]);
        if (typeof(input) === "string") {
            if (input.length === 1)
                return Buffer.from([ ProtocolType.StringOne ]).concat(Buffer.from(input));
            return PyString.encodeBuffer(marshal, input, ProtocolType.String);
        }
        if (input instanceof Buffer) {
            return PyString.encodeBuffer(marshal, input, ProtocolType.Buffer);
        }
    }

    static encodeBuffer (marshal, input, type) {
        let length = MarshalHelper.writeLength(input.length);
        return Buffer.from([ type ]).concat(length, Buffer.from(input));
    }

}

module.exports = PyString;