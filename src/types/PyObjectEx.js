"use strict";

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

}

module.exports = PyObjectEx;