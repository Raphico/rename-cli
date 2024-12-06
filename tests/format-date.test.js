import { test, describe, expect } from "vitest";
import { formatDate } from "../src/utils/format-date.js";

describe("formatDate", () => {
	test("should a date in correct format", () => {
		const date = new Date("2024-01-05T16:04:31.427Z");
		expect(formatDate(date, "YYYY-MM-DD")).toBe("2024-01-05");
		expect(formatDate(date, "MM-DD-YYYY")).toBe("01-05-2024");
		expect(formatDate(date, "yyyy-mm-dd")).toBe("2024-01-05");
		expect(formatDate(date, "mm-dd-yyyy")).toBe("01-05-2024");
	});

	test("should throw when passed an invalid date", () => {
		expect(() => formatDate("test", "yyyy-mm-dd")).toThrow();
	});
});
