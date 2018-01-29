"use strict";

class Marshal {

    constructor () {
        this._initialized = false;
        this._output = null;
    }

    get value () {
        if (this._initialized === false) {
            this._initialized = true;
            this._output = this.process();
        }
        return this._output;
    }

    process () {
        throw new Error("NotImplementedException");
    }

}

module.exports = Marshal;