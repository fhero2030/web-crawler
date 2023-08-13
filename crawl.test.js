const { normalizeURL, getURLsFromHTML } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizeURL", () => {
  const input = "https://blog.boot.dev/path/";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML", () => {
  const input = `<html><body><a href="https://blog.boot.dev/"><span>Go to Boot.dev</span></a></body></html>`;
  const inputBasedURL = "https://blog.boot.dev";
  const actual = getURLsFromHTML(input, inputBasedURL);
  const expected = ["https://blog.boot.dev/"];

  expect(actual).toEqual(expected);
});
