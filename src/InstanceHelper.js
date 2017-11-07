const nameToClass = new Map();

class InstanceHelper {

	static FromPyInstance (obj) {
		const T = nameToClass.get(obj.Name);
		if (!T) {
			console.warn(`No class found for PyInstance '${obj.Name}'`);
			return obj;
		} else {
			const t = new T();
				t.state = obj.Arguments.Items;
			return t;
		}
	}

	static AddClass (name, T) {
		if (T === undefined)
			return nameToClass.set(name.prototype.__guid__, name);
		else
			return nameToClass.set(name, T);
	}

	static GetMap () {
		return nameToClass;
	}
	
}

module.exports = InstanceHelper;