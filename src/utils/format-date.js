"use strict";

/**
 * get dates in specified format
 * @param {Date} date
 * @param {string} format - preferred date format i.e "YYYY-MM-DD"
 */
export function formatDate(date, format) {
	if (!(date instanceof Date)) {
		throw new Error("invalid date");
	}

	return format
		.toLowerCase()
		.replace("yyyy", date.getFullYear())
		.replace("mm", String(date.getMonth() + 1).padStart(2, "0"))
		.replace("dd", String(date.getDate()).padStart(2, "0"));
}
