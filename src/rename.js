"use strict";

import fs from "node:fs";
import path from "node:path";
import { printError } from "./utils/help.js";
import { isFile } from "./utils/is-file.js";
import { nonEmpty } from "./utils/non-empty.js";
import { formatDate } from "./utils/format-date.js";

export function handleRename(argv) {
	const ALLOWED_DATE_FORMATS = ["yyyy-mm-dd", "dd-mm-yyyy"];

	if (!nonEmpty(argv.directory)) {
		printError("bfr: missing directory");
		return;
	} else if (!fs.existsSync(argv.directory)) {
		printError(`'${argv.directory ?? "--directory"}' not found`);
		return;
	}

	if (nonEmpty(argv.pattern) && nonEmpty(argv.replace)) {
		const logs = patternRename(
			argv.directory,
			argv.pattern,
			argv.replace,
			argv["file-type"],
			argv["dry-run"],
			argv.sequence
		);
		!argv["dry-run"] && updateHistory(logs);
		return;
	}

	if (
		argv["date-created"] &&
		nonEmpty(argv["date-format"]) &&
		ALLOWED_DATE_FORMATS.includes(argv["date-format"].toLowerCase())
	) {
		const logs = dateCreatedRename(
			argv.directory,
			argv["date-format"],
			argv["file-type"],
			argv["dry-run"],
			argv.sequence
		);
		!argv["dry-run"] && updateHistory(logs);
		return;
	}

	printError("bfr: usage error");
}

function dateCreatedRename(
	directoryPath,
	dateFormat,
	fileType,
	dryRun = false,
	addSequenceNumber = false
) {
	return readdir(directoryPath, fileType).map(function renameFile(
		filePath,
		index
	) {
		const stat = fs.statSync(filePath);

		const sequenceNumber = addSequenceNumber
			? `${String(index).padStart(3, "0")}_`
			: "";
		const prefix = `${formatDate(
			new Date(stat.ctime),
			dateFormat
		)}_${sequenceNumber}`;

		const newPath = `${path.dirname(filePath)}/${prefix}${path.basename(
			filePath
		)}`;

		renameOrLog(filePath, newPath, dryRun);
		return {
			newName: newPath,
			oldName: filePath,
		};
	});
}

function patternRename(
	directoryPath,
	pattern,
	replace,
	fileType,
	dryRun = false,
	addSequenceNumber = false
) {
	return readdir(directoryPath, fileType)
		.filter(function getMatchFiles(file) {
			const match = new RegExp(pattern);
			return match.test(file);
		})
		.map(function renameFile(filePath, index) {
			const sequenceNumber = addSequenceNumber
				? `${String(index).padStart(3, "0")}_`
				: "";
			const newPath =
				path.dirname(filePath) +
				"/" +
				path
					.basename(filePath)
					.replace(pattern, `${replace}${sequenceNumber}`);

			renameOrLog(filePath, newPath, dryRun);
			return {
				newName: newPath,
				oldName: filePath,
			};
		});
}

function readdir(directoryPath, fileType) {
	return fs
		.readdirSync(directoryPath)
		.map(function getFullPath(file) {
			return path.join(directoryPath, file);
		})
		.filter((file) =>
			isFile(file) && fileType ? path.extname(file) === fileType : true
		);
}

export function renameOrLog(oldPath, newPath, log) {
	if (!log) {
		try {
			fs.renameSync(oldPath, newPath);
		} catch (error) {
			console.error(`Error renaming ${oldPath} to ${newPath}`);
			console.error(error);
		}
	} else {
		console.log(path.basename(newPath));
	}
}

function updateHistory(fileLogs) {
	const historyPath = path.resolve(import.meta.dirname, "../history.json");
	fs.writeFileSync(historyPath, JSON.stringify(fileLogs));
}
