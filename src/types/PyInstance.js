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
            console.warn(`No class found for PyInstance '${name}'`);
            const obj = (nom) => ({
                [nom]: class extends PyInstance {

                    get __guid__ () {
                        return nom;
                    }

                    get state () {
                        return this._value;
                    }

                }
            }[nom]);
            return new (obj(name))(args);
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

    toJSON () {
        return {
            type: this.__guid__ || this.constructor.name,
            data: this.state,
        };
    }

}

module.exports = PyInstance;