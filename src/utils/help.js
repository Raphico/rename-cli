export function printHelp() {
	const help = `
Usage:
    bfr <command> [options]

Commands:
    rename	rename files in a directory
    undo	revert the last rename operation

Options:
    -p, --pattern <string>        pattern to search in filenames for renaming.
    -r, --replace <string>        string to replace the search pattern with.
	--date-created           	  rename files based on their creation date.
    --date-format <format>        specify date format (e.g., "YYYY-MM-DD").
    -s, --sequence                add sequential numbers to renamed files.
    -d, --directory <path>        directory containing files to rename.
    -f, --file-type <extension>   limit renaming to specific file type (e.g., ".jpg").
    --dry-run                     preview renaming changes without applying them.

Examples:
    bfr rename --pattern "IMG_" --replace "Vacation_" --directory "/path/to/photos" --sequence
    bfr rename --date-created --date-format "YYYY-MM-DD" --directory "/path/to/files"
    bfr rename --pattern="Document_" --replace="Project_" --dry-run --directory="/path/to/documents"
    bfr rename -p "Document_" -r "Project_" -f ".txt" -d "/path/to/documents"
    bfr undo
`;

	console.log(help);
}

/**
 * print error message to the stderror
 * @param {string} errorMessage - error message
 * @param {boolean} showHelpCommand - display help command
 */
export function printError(errorMessage, showHelpCommand = true) {
	console.error(errorMessage);
	if (showHelpCommand) {
		console.error("Try 'bfr --help' for more information.");
	}
}
