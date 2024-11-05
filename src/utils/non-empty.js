/**
 * checks if a string is not empty
 * @param {string} str
 * @returns
 */
export function nonEmpty(str) {
	return !!str && str.trim().length > 0;
}
