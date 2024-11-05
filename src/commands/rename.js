import fs from "node:fs";
import path from "node:path";
import { printError } from "../utils/help.js";
import { isFile } from "../utils/is-file.js";
import { nonEmpty } from "../utils/non-empty.js";
import { ALLOWED_DATE_FORMATS } from "../constants.js";
import { formatDate } from "../utils/format-date.js";

export function handleRename(argv) {
	if (!nonEmpty(argv.directory)) {
		printError("bfr: missing directory");
		return;
	} else if (!fs.existsSync(argv.directory)) {
		printError(`'${argv.directory ?? "--directory"}' not found`);
		return;
	}

	if (nonEmpty(argv.pattern) && nonEmpty(argv.replace)) {
		patternRename(
			argv.directory,
			argv.pattern,
			argv.replace,
			argv["dry-run"],
			argv.sequence
		);
		return;
	}

	if (
		argv["date-created"] &&
		nonEmpty(argv["date-format"]) &&
		ALLOWED_DATE_FORMATS.includes(argv["date-format"].toLowerCase())
	) {
		dateCreatedRename(
			argv.directory,
			argv["date-format"],
			argv["dry-run"],
			argv.sequence
		);
		return;
	}

	printError("bfr: usage error");
}

function dateCreatedRename(
	directoryPath,
	dateFormat,
	dryRun = false,
	addSequenceNumber = false
) {
	readdir(directoryPath).forEach(function renameFile(filePath, index) {
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
	});
}

function patternRename(
	directoryPath,
	pattern,
	replace,
	dryRun = false,
	addSequenceNumber = false
) {
	readdir(directoryPath)
		.filter(function getMatchFiles(file) {
			const match = new RegExp(pattern);
			return match.test(file);
		})
		.forEach(function renameFile(filePath, index) {
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
		});
}

function readdir(directoryPath) {
	return fs
		.readdirSync(directoryPath)
		.map(function getFullPath(file) {
			return path.join(directoryPath, file);
		})
		.filter(isFile);
}

function renameOrLog(oldPath, newPath, log) {
	if (!log) {
		try {
			fs.renameSync(oldPath, newPath);
		} catch (error) {
			console.error(`Error renaming ${oldPath} to ${newPath}`);
			console.error(error);
		}
	} else {
		console.log(newPath);
	}
}
