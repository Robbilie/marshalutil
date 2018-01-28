"use strict";

if (!Buffer.prototype.concat)
    Object.defineProperty(Buffer.prototype, "concat", {
       value: function (...buffers) {
           return Buffer.concat([this, ...buffers], buffers.reduce((p,c) => p + c.length, this.length));
       }
    });