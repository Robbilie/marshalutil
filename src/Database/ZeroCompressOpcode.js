class ZeroCompressOpcode {

	constructor (source) {
		this.FirstLength = (source & 0x07);
		this.FirstIsZero = (source & 0x08) > 0;
		this.SecondLength = ((source & 0x70) >> 4);
		this.SecondIsZero = (source & 0x80) > 0;
	}

}

module.exports = ZeroCompressOpcode;