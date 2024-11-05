/**
 * returns a new args array, hiding the node and scripts path
 * @param {Array<string>} args
 * @returns {Array<string>}
 */
export function hideBin(args) {
	return args.slice(2);
}
