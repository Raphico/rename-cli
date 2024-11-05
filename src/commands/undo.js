import fs from "node:fs";
import path from "node:path";
import { printError } from "../utils/help.js";

export function undo() {
	const logsPath = path.join(import.meta.dirname, "logs/history.json");

	if (!fs.existsSync(logsPath)) {
		printError("bfr: no renaming history found to undo", false);
	}
}
