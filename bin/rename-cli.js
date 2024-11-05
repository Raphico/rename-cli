#! /usr/bin/env node

"use strict";

import minimist from "minimist";
import { hideBin } from "../src/utils/hide-bin.js";
import { printError, printHelp } from "../src/utils/help.js";
import { handleRename } from "../src/commands/rename.js";
import { handleUndo } from "../src/commands/undo.js";

const argv = minimist(hideBin(process.argv), {
	string: ["pattern", "replace", "directory", "date-format", "file-type"],
	boolean: ["help", "date-created", "sequence", "dry-run"],
	alias: {
		h: "help",
		p: "pattern",
		r: "replace",
		d: "directory",
		s: "sequence",
		f: "file-type",
	},
});

if (argv.help) {
	printHelp();
} else if (argv._.includes("rename")) {
	handleRename(argv);
} else if (argv._.includes("undo")) {
	handleUndo();
} else {
	printError("bfr: usage error");
}
