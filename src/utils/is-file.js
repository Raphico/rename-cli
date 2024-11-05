"use strict";

import fs from "node:fs";

export function isFile(fileName) {
	return fs.lstatSync(fileName).isFile();
}
