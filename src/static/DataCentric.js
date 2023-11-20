class MapWithOrderedKeys {
    constructor() {
        this.map = new Map();
        this.keys = [];
    }

    set(key, value) {
        if (!this.map.has(key)) {
            this.keys.push(key);
        }
        this.map.set(key, value);
    }

    get(key) {
        return this.map.get(key);
    }

    forEach(callback) {
        this.keys.forEach((key) => {
            callback(this.map.get(key), key);
        });
    }

    [Symbol.iterator]() {
        let index = 0;
        const keys = this.keys;
        const map = this.map;
        return {
            next() {
                if (index < keys.length) {
                    const key = keys[index];
                    index++;
                    return { value: [key, map.get(key)], done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }
}

module.exports = MapWithOrderedKeys; 