"use strict";

const { PyObject } = require(".");

class PyInstance extends PyObject {

    decode (marshal, opcode) {
        const name = marshal.process();
        const obj = {
            [name]: class extends PyInstance {

                constructor (args) {
                    super();
                    this.args = args;
                }

            }
        };
        const args = marshal.process();
        return new obj[name](args);
    }

}

module.exports = PyInstance;