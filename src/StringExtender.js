Object.defineProperty(Buffer.prototype, 'ToUTF8String', {
	value: function () {
		return this.toString("utf8");
	}
});

Object.defineProperty(String.prototype, 'ToHex', {
	value: function () {
		return this.split("").reduce((str, x) => str + x.charCodeAt(0).toString(16).padStart(2, "0"), "");
	}
});

Object.defineProperty(Buffer.prototype, 'ToHexString', {
	value: function () {
		return this.toString("hex");
	}
});

Object.defineProperty(String.prototype, 'HexToBytes', {
	value: function () {
		return Array.from(this, "hex");
	}
});

Object.defineProperty(String.prototype, 'SwapEndianness', {
	value: function () {
		return this.HexToBytes().SwapEndianness().ToHex();
	}
});

Object.defineProperty(Buffer.prototype, 'SwapEndianness', {
	value: function () {
		return Buffer.from(this.toJSON().data.reverse());
	}
});



Object.defineProperty(String.prototype, 'IsLetterOrDigit', {
	value: function () {
		const charCode = this.charCodeAt(0);
		return (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || (charCode >= 48 && charCode <= 57);
	}
});