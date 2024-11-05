const help = `
Usage:
    bfr <command> [options]

Commands:
    rename	rename files in a directory
    undo	revert the last rename operation

Options:
    --pattern <string>       pattern to search in filenames for renaming.
    --replace <string>       string to replace the search pattern with.
    --date-created           rename files based on their creation date.
    --date-modified          rename files based on their modification date.
    --date-format <format>   specify date format (e.g., "YYYY-MM-DD").
    --use-metadata           rename files based on metadata (e.g., EXIF).
    --field <string>         metadata field to use for renaming.
    --sequence               add sequential numbers to renamed files.
    --directory <path>       directory containing files to rename.
    --file-type <extension>  limit renaming to specific file type (e.g., ".jpg").
    --dry-run                preview renaming changes without applying them.

Examples:
    bfr rename --pattern="IMG_" --replace="Vacation_" --directory="/path/to/photos" --sequence
    bfr rename --date-created --date-format="YYYY-MM-DD" --directory="/path/to/files"
    bfr rename --use-metadata --field="Camera Model" --directory="/path/to/photos"
    bfr rename --pattern="Document_" --replace="Project_" --dry-run --directory="/path/to/documents"
    bfr undo
`;

export function printHelp() {
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
