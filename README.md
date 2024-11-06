# Bulk File rename

A command-line tool for bulk renaming files based on patterns, dates, and file type

## Features

-   **Pattern-Based Renaming:** Rename files by specifying search and replacement patterns.
-   **Date-Based Renaming:** Rename files using their creation dates.
-   **File-type-Based Renaming:** Rename only files with specified file type
-   **Undo Functionality:** Easily revert the last renaming operation.
-   **Dry Run Mode:** Preview changes before applying them.

## Installation

1. Clone repository

```bash
git clone git@github.com:Raphico/rename-cli.git
cd rename-cli
```

2. Install dependencies

```bash
npm install
```

3. Create symlink

```bash
npm link
```

## Usage

```bash
bfr --help
```

## Command

| Command                       | Description                                            | Example                                             |
| ----------------------------- | ------------------------------------------------------ | --------------------------------------------------- |
| `rename`                      | Rename files in a specified directory.                 | `bfr rename --pattern "IMG_" --replace "Vacation_"` |
| `undo`                        | Revert the last rename operation.                      | `bfr undo`                                          |
| `-p, --pattern <string>`      | Search pattern to match in filenames for renaming.     | `--pattern "IMG_"`                                  |
| `-r, --replace <string>`      | String to replace the search pattern with.             | `--replace "Vacation_"`                             |
| `--date-created`              | Rename files based on their creation date.             | `--date-created`                                    |
| `--date-format <format>`      | Specify the date format (e.g., "YYYY-MM-DD").          | `--date-format "YYYY-MM-DD"`                        |
| `-s, --sequence`              | Add sequential numbers to renamed files.               | `--sequence`                                        |
| `-d, --directory <path>`      | Directory containing files to rename.                  | `--directory "/path/to/photos"`                     |
| `-f, --file-type <extension>` | Limit renaming to a specific file type (e.g., ".jpg"). | `--file-type ".jpg"`                                |
| `--dry-run`                   | Preview renaming changes without applying them.        | `--dry-run`                                         |
