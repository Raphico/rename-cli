import fs from "node:fs";
import path from "node:path";
import { printError } from "../utils/help.js";
import { isFile } from "../utils/is-file.js";
import { nonEmpty } from "../utils/non-empty.js";

export function rename(argv) {
	if (!nonEmpty(argv.directory)) {
		printError("bfr: missing directory");
		return;
	} else if (!fs.existsSync(argv.directory)) {
		printError(`'${argv.directory ?? "--directory"}' not found`);
		return;
	}

	if (nonEmpty(argv.pattern) && nonEmpty(argv.replace)) {
		patternRename(argv.directory, argv.pattern, argv.replace);
		return;
	}

	printError("bfr: usage error");
}

function patternRename(directoryPath, pattern, replace) {
	fs.readdirSync(directoryPath)
		.map(function getFullPath(file) {
			return path.join(directoryPath, file);
		})
		.filter(function getMatchFiles(file) {
			if (isFile(file)) {
				const match = new RegExp(pattern);
				return match.test(file);
			}
			return false;
		})
		.forEach(function renameFile(file) {
			try {
				const newPath = file.replace(pattern, replace);
				fs.renameSync(file, newPath);
			} catch (error) {
				console.error(`Error renaming ${file} to ${newPath}`);
				console.error(error);
			}
		});
}
