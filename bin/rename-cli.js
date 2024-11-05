#! /usr/bin/env node

"use strict";

import minimist from "minimist";
import { hideBin } from "../src/utils/hide-bin.js";
import { printError, printHelp } from "../src/utils/help.js";
import { rename } from "../src/commands/rename.js";
import { undo } from "../src/commands/undo.js";

const argv = minimist(hideBin(process.argv), {
	string: ["pattern", "replace", "directory", "date-format", "field"],
	boolean: ["help", "date-created", "sequence", "dry-run", "use-metadata"],
	alias: {
		h: "help",
	},
});

if (argv.help) {
	printHelp();
} else if (argv._.includes("rename")) {
	rename(argv);
} else if (argv._.includes("undo")) {
	undo();
} else {
	printError("bfr: usage error");
}
