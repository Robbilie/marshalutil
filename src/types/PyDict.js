"use strict";

const { PyObject } = require(".");
const { ProtocolType, MarshalHelper } = require("..");

class PyDict extends PyObject {

    decode (marshal, opcode) {
        const length = marshal.getLength();
        return new Array(length).fill(0).reduce((p) => {
            const value = marshal.process();
            const key = marshal.process();
            p[key] = value;
            return p;
        }, {});
    }

    encode (marshal, input) {
        const entries = Object.entries(input);
        return Buffer.from([ ProtocolType.Dict ])
            .concat(
                MarshalHelper.writeLength(entries.length),
                entries.reduce((buffer, [key, value]) => buffer.concat(marshal.processType(value), marshal.processType(key)), Buffer.alloc(0))
            );
    }

}

module.exports = PyDict;