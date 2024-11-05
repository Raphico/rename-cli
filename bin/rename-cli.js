#! /usr/bin/env node

"use strict";

import minimist from "minimist";
import { hideBin } from "../src/utils/hide-bin.js";
import { printError, printHelp } from "../src/utils/help.js";

const argv = minimist(hideBin(process.argv), {
	boolean: ["help"],
	alias: {
		h: "help",
	},
});

if (argv.help) {
	printHelp();
} else {
	printError("bfr: usage error");
}
