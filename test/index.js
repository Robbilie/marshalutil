const assert = require("assert");
const { MarshalStream } = require("./../src");
const Types = require("./../src/Types/");

const tests = [
	function ZeroDecode () {
		let value = new MarshalStream(Buffer.from([ 0x7e, 0x00, 0x00, 0x00, 0x00, 0x08 ])).Value;

		console.log(value.ToString());

		assert.notEqual(value, null);
		assert(value instanceof Types.PyInt);
		assert.equal(0, value.Value);
	},
	function Tuple1OneDecode () {
		let value = new MarshalStream(Buffer.from([ 0x7e, 0x00, 0x00, 0x00, 0x00, 0x25, 0x09 ])).Value;

		console.log(value.ToString());

		assert.notEqual(value, null);
		assert(value instanceof Types.PyTuple);
		assert.equal(1, value.Items.length);
		assert(value.Items[0] instanceof Types.PyInt);
		assert.equal(1, value.Items[0].Value);
	},
	function StringTableDecode () {
		let value = new MarshalStream(Buffer.from([ 0x7e, 0x00, 0x00, 0x00, 0x00, 0x11, 0x5a ])).Value;

		console.log(value.ToString());

		assert.notEqual(value, null);
		assert(value instanceof Types.PyString);
		assert.equal("JoinChannel", value.Value);
	},
	function BufferDecode () {
		let value = new MarshalStream(Buffer.from([ 0x7e, 0x00, 0x00, 0x00, 0x00, 0x13, 0x13, 0x45, 0x56, 0x45, 0x2d, 0x54, 0x52, 0x41, 0x4e, 0x51, 0x55, 0x49, 0x4c, 0x49, 0x54, 0x59, 0x40, 0x63, 0x63, 0x70 ])).Value;

		console.log(value.ToString());

		assert.notEqual(value, null);
		assert(value instanceof Types.PyString);
		assert.equal("EVE-TRANQUILITY@ccp", value.Value);
	},
	function WrongInputLength () {
		let ms = new MarshalStream(Buffer.from([ 0x7e, 0x00, 0x00, 0x00, 0x00, 0x25 ]));

		try {
			ms.Value;
			assert.fail();
		} catch (e) {
			console.log(e.toString());
			assert.equal("Error: ArgumentOutOfRangeException: Index is higher than dat!", e.toString());
		}
	},
	function EmptyList () {
		let emptyLists = [
			Buffer.from([ 0x7e, 0x00, 0x00, 0x00, 0x00, 0x26 ]),
			Buffer.from([ 0x7e, 0x00, 0x00, 0x00, 0x00, 0x15, 0x00 ])
		];

		for (let emptyList of emptyLists) {
			let value = new MarshalStream(emptyList).Value;

			console.log(value.ToString());

			assert.notEqual(value, null);
			assert(value instanceof Types.PyList);
			assert.equal(0, value.Items.length);
		}
	},
	function EmptyTuple () {
		let emptyLists = [
			Buffer.from([ 0x7e, 0x00, 0x00, 0x00, 0x00, 0x24 ]),
			Buffer.from([ 0x7e, 0x00, 0x00, 0x00, 0x00, 0x14, 0x00 ])
		];

		for (let emptyList of emptyLists) {
			let value = new MarshalStream(emptyList).Value;

			console.log(value.ToString());

			assert.notEqual(value, null);
			assert(value instanceof Types.PyTuple);
			assert.equal(0, value.Items.length);
		}
	},
	function AdvancedTest () {
		let lines = require("fs").readFileSync(require("path").join(__dirname, "testdata.txt")).toString().split("\n");

		let errors = [];
		for (let line of lines) {
			let ms = new MarshalStream(Buffer.from(line, "hex"));

			try {
				console.log(ms.Value.ToString());
				ms.Value;
				console.log(lines.indexOf(line) + 1, "/", lines.length);
			} catch (e) {
				console.log("failed to parse line:", line);
				//throw e;
				errors.push(e);
			}
		}
		console.log("Finished with errors:", errors.length);
		console.log(errors);
	}
];

tests.forEach(test => test());