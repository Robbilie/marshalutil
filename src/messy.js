
class Storage {

	constructor (size, data) {
		this._storage = {};
		this._index = 0;
		this._map = this.setup(size, data);
	}

	setup (size, data) {
		const stream = new StreamBuffer(data);
		const map = {};
		for (let i = 0; i < size; i++) {
			map[i] = stream.readUInt32LE();
		}
		return map;
	}

	store (obj) {
		let index = this.getMap()[this._index++];
		if (index === 0)
			index = 1;
		if (index > 0)
			this.set(index, obj);
	}

	set (index, obj) {
		this._storage[index] = obj;
	}

	get (index) {
		return this._storage[index - 1] || this._storage[this._map[index - 1] - 1];
	}

	getMap () {
		return this._map;
	}

	[Symbol.iterator] () {
		return Object.values(this._storage);
	}

}

/////////////////////////////////////////////////////////////////////////////////////////////////////

class MarshalStreamValidator {

	static validate (buffer) {
		let data = buffer;
		if (!(data instanceof Buffer))
			throw new Error("InvalidTypeException: Not a Buffer");
		if (data === null || data.length === 0)
			throw new Error("ArgumentNullException");
		if (data[0] === ProtocolConstants.ZlibMarker)
			data = Zlib.decompress(data);
		if (data[0] !== ProtocolConstants.ProtocolId)
			throw new Error("ArgumentException: Invalid stream header");
		return data;
	}

}

/////////////////////////////////////////////////////////////////////////////////////////////////////

class MarshalStream {

	constructor (buffer) {
		this._initialized = false;
		this._output = null;
		this._needObjectEx = false;
		this._stream = this.createStream(buffer);
		this._storage = this.setupStorage();
	}

	createStream (buffer) {
		const data = MarshalStreamValidator.validate(buffer);
		return new StreamBuffer(data);
	}

	setupStorage () {
		const size = this.getInt(4);
		const data = this.getStream().slice(size);
		return new Storage(size, data);
	}

	get value () {
		if (this._initialized === false)
			this._output = this.process();
		return this._output;
	}

	process () {
		const { opcode, shared } = this.getTypeAndShared();
		const result = this.processType(opcode);
		if (shared === true)
			this.storeResult(result);
		return result;
	}

	processType (opcode) {
		const decoder = this.getDecoder(opcode);
		if (decoder === undefined)
			throw new Error(`MissingDecoderException: 0x${opcode.toString(16).padStart(2, "0")}`)
		return this.decode(decoder, opcode);
	}

	getDecoder (opcode) {
		return GROUPS.find(processor => processor.getDecoder(opcode));
	}

	decode (T, opcode) {
		const instance = new T();
		return instance.decode(this, opcode);
	}

	storeResult (result) {
		this.getStorage().store(result);
	}

	getTypeAndShared () {
		let opcode = this.getInt(1);
		let shared = (opcode & ProtocolConstants.SharedFlag) === ProtocolConstants.SharedFlag;
			opcode &= ~ProtocolConstants.SharedFlag;
		return { opcode, shared };
	}
	
	getInt (bytesToRead = 1) {
		const bytes = Buffer.alloc(4);
		this.getBytes(bytesToRead).copy(bytes);
		return bytes.readUInt32LE();
	}

	getBytes (bytesToRead) {
		return this.getStream().read(bytesToRead);
	}


	getLength () {
		let length = this.getInt(1);
		if (length === 0xff)
			length = this.getInt(4);
		return length;
	}

	getStream () {
		return this._stream;
	}

	getStorage () {
		return this._storage;
	}

}

/////////////////////////////////////////////////////////////////////////////////////////////////////

class Group {

	static getDecoder () {
		throw new Error("NotImplementedException");
	}

}

class NoneGroup extends Group {

	static getDecoder (opcode) {
		if (opcode === ProtocolType.None)
			return TYPES.PyNone;
	}

}

class BooleanGroup extends Group {

	static getDecoder (opcode) {
		if ([ProtocolType.True, ProtocolType.False].includes(opcode))
			return TYPES.PyBool;
	}

}

class RefGroup extends Group {

	static getDecoder (opcode) {

	}

}

const GROUPS = [
	NoneGroup,
	BooleanGroup,
	FloatGroup,
	IntGroup,
	LongGroup,
	TupleGroup,
	ListGroup,
	StringGroup,
];

/////////////////////////////////////////////////////////////////////////////////////////////////////

class PyObject {

	decode () {
		throw new Error("NotImplementedException");
	}

}

class RefObject {

	decode (marshal) {
		const index = marshal.getLength();
		const storage = marshal.getStorage();
		const result = storage.get(index);
		if (marshal._needObjectEx === false || result instanceof TYPES.PyObjectEx)
			return result;
		marshal._needObjectEx = false;
		for (let obj of storage) {
			if (obj instanceof TYPES.PyObjectEx) {
				return obj;
			}
		}
	}

}

class PyNone extends PyObject {

	decode () {
		return null;
	}

}

class PyBool extends PyObject {

	decode (marshal, opcode) {
		if (opcode === ProtocolConstants.True)
			return true;
		else
			return false;
	}

}

const TYPES = {
	PyObject,
	PyNone,
	PyBool,
};
