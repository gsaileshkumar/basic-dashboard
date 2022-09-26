/**
 *
 * @param list array of objects
 * @param keyGetter function that retrieves the key based on which the resulting array is grouped
 * @returns grouped array.
 * 		each array consits of 2 elements
 * 		-> 1 is the grouped by property
 * 		-> 2 is the array of objects belong to that group
 */

export const groupBy = (list, keyGetter) => {
	const map = new Map();
	list.forEach((item) => {
		const key = keyGetter(item);
		const collection = map.get(key);
		if (!collection) {
			map.set(key, [item]);
		} else {
			collection.push(item);
		}
	});
	return map;
};
