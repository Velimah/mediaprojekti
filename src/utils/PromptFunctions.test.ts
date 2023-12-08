import { PromptFunctions } from "./PromptFunctions";
import { expect, test } from "vitest";

const { removeHtmlMarkdown } = PromptFunctions();

test("removes HTML markdown from input string", () => {
  const inputString = "Some text ```html <div>HTML content</div>``` Some more text";
  const expectedOutput = "html <div>HTML content</div>";
  expect(removeHtmlMarkdown(inputString)).toBe(expectedOutput);
});

test("handles input without HTML markdown", () => {
  const inputString = "No HTML markdown here";
  expect(removeHtmlMarkdown(inputString)).toBe(inputString);
});
