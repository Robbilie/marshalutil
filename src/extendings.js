"use strict";

if (!Buffer.prototype.concat)
    Object.defineProperty(Buffer.prototype, "concat", {
       value: function (...buffers) {
           return Buffer.concat([this, ...buffers], buffers.reduce((p,c) => p + c.length, this.length));
       }
    });

if (!String.prototype.isASCII)
    Object.defineProperty(String.prototype, 'isASCII', {
        value: function () {
            return /^[\x00-\x7F]*$/.test(this);
            /*const charCode = this.charCodeAt(0);
            return (charCode >= 0x20 && charCode <= 0x7e);*/
        }
    });