import fs from "node:fs";
import path from "node:path";
import { printError } from "./utils/help.js";
import { renameOrLog } from "./rename.js";

export function handleUndo() {
	const historyPath = path.resolve(import.meta.dirname, "../history.json");
	const history = JSON.parse(
		fs.readFileSync(historyPath, { encoding: "utf8" })
	);

	if (history.length == 0) {
		printError("bfr: history is empty", false);
	}

	history.forEach(function reset(file) {
		renameOrLog(file.newName, file.oldName, false);
	});
}
