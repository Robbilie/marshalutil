"use strict";

const { ProtocolType } = require("..");
const { PyObject, PyMark } = require(".");

class PyObjectEx extends PyObject {

    decode (marshal, opcode) {
        const header = marshal.process();
        const list = [];
        const dict = {};

        while (true) {
            const obj = marshal.process();
            if (obj instanceof PyMark)
                break;
            list.push(obj);
        }

        while (true) {
            const obj = marshal.process();
            if (obj instanceof PyMark)
                break;
            dict[obj] = marshal.process();
        }

        const obj = {
            ["NewObj"]: class extends PyObjectEx {

                constructor (header, args) {
                    super();
                    this._header = header;
                    this._args = args;
                }

                get header () {
                    return this._header;
                }

                get args () {
                    return this._args;
                }

                toJSON () {
                    return {
                        type: this.constructor.name,
                        header: this.header,
                        args: this.args,
                    };
                }

            }
        };
        let args = undefined;
        if (list.length > 0) {
            args = list;
        }
        if (Object.keys(dict).length > 0) {
            if (args === undefined) {
                args = dict;
            } else {
                throw new Error("PyObjectEx: list and dict set");
            }
        }
        return new obj["NewObj"](header, args);
    }

    encode (marshal, input) {
        if (input.type === undefined)
            throw new Error("NoTypeException");
        return Buffer.from([ input.type ]).concat(
            marshal.processType(input.header),
            ...input.args.map(arg => marshal.processType(arg)),
            Buffer.from([ ProtocolType.Mark ]),
            ...Object
                .entries(input.kwargs)
                .reduce((arr, [k, v]) => {
                    arr.push(marshal.processType(k));
                    arr.push(marshal.processType(v));
                    return arr;
                }, []),
            Buffer.from([ ProtocolType.Mark ]),
        );
    }

    valueOf () {
        return this;
    }

    get args () {
        return [];
    }

    get kwargs () {
        return {};


}

module.exports = PyObjectEx;