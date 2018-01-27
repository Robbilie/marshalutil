const nameToClass = new Map();

class InstanceHelper {

	static FromPyInstance (obj) {
		const T = nameToClass.get(obj.Name.Value);
		if (!T) {
			console.warn(`No class found for PyInstance '${obj.Name.Value}'`);
			return obj;
		} else {
			/*
			const property = Object.getOwnPropertyDescriptor(T.prototype, "state");
			console.log(T.name, property, obj.Arguments.Items)
			if (property !== undefined && property.set !== undefined) {
				const t = new T();
				t.state = obj.Arguments.Items;
				return t;
			} else {
				return new T(obj.Arguments.Dict);
			}
			*/
			const t = new T();
			t.state = obj.Arguments.Items || obj.Arguments.Dict;
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