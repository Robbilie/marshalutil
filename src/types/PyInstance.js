"use strict";

const { PyObject } = require(".");
const { InstanceHelper, ProtocolType } = require("..");

class PyInstance extends PyObject {

    decode (marshal, opcode) {
        const name = marshal.process();
        const args = marshal.process();
        if (InstanceHelper.has(name)) {
            const T = InstanceHelper.get(name);
            const instance = new T();
            instance.state = args;
            return instance;
        } else {
            const obj = {
                [name]: class extends PyInstance {

                    constructor (args) {
                        super();
                        this._args = args;
                    }

                    get args () {
                        return this._args;
                    }

                }
            };
            return new obj[name](args);
        }
    }

    encode (marshal, input) {
        return Buffer.from([ ProtocolType.Instance ]).concat(
            marshal.processType(input.__guid__),
            marshal.processType(input.state),
        );
    }

}

module.exports = PyInstance;