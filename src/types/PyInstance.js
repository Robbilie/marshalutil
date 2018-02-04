"use strict";

const { PyObject } = require(".");
const { InstanceHelper, ProtocolType } = require("..");

class PyInstance extends PyObject {

    decode (marshal, opcode) {
        const name = marshal.process();
        const args = marshal.process();
        if (InstanceHelper.has(name)) {
            return InstanceHelper.decode(name, args);
        } else {
            const obj = {
                [name]: class extends PyInstance {

                    get state () {
                        return this._value;
                    }

                }
            };
            return new obj[name](args);
        }
    }

    encode (marshal, input) {
        return Buffer.from([ ProtocolType.Instance ]).concat(
            marshal.processType(input.__guid__ || input.constructor.name),
            marshal.processType(input.state),
        );
    }

    get hasStateSetter () {
        return this.hasState("set");
    }

    hasState (key) {
        return !!(Object.getOwnPropertyDescriptor(this, "state") || { [key]: false })[key] || (Object.getPrototypeOf(this).constructor.name === "Object" ? false : Object.getPrototypeOf(this).hasState(key));
    }

    get hasStateGetter () {
        return this.hasState("get");
    }

}

module.exports = PyInstance;