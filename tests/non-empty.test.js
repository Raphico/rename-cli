import { test, describe, expect } from "vitest";
import { nonEmpty } from "../src/utils/non-empty.js";

describe("nonEmpty", () => {
	test("should return false if string is empty", () => {
		expect(nonEmpty("")).toBe(false);
	});

	test("should return false if string contains whitespace", () => {
		expect(nonEmpty("   	")).toBe(false);
	});

	test("should return true for non empty strings", () => {
		expect(nonEmpty("test")).toBe(true);
	});

	test("should return false if undefined", () => {
		expect(nonEmpty(undefined)).toBe(false);
	});
});
