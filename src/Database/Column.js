class Column {

	constructor (name, type, value) {
		this.Name = name;
		this.Type = type;
		this.Value = value;
	}

	InternalToString (indentLevel) {
		return `${this.Name}: ${this.Value.InternalToString(indentLevel + 1)}`;
	}
	
}

module.exports = Column;