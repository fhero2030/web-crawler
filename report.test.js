const { sortPages } = require("./report.js");
const { test, expect } = require("@jest/globals");

test("sortPages", () => {
  const input = { "https://jcarlo.vercel.app/home": 1, "https://jcarlo.vercel.app": 3 };
  const actual = sortPages(input);
  const expected = [
    ["https://jcarlo.vercel.app", 3],
    ["https://jcarlo.vercel.app/home", 1],
  ];
  expect(actual).toEqual(expected);
});

test("sort 5 pages", () => {
  const input = {
    "https://jcarlo.vercel.app/10": 10,
    "https://jcarlo.vercel.app/3": 3,
    "https://jcarlo.vercel.app/20": 20,
    "https://jcarlo.vercel.app/5": 5,
    "https://jcarlo.vercel.app/9": 9,
  };
  const actual = sortPages(input);
  const expected = [
    ["https://jcarlo.vercel.app/20", 20],
    ["https://jcarlo.vercel.app/10", 10],
    ["https://jcarlo.vercel.app/9", 9],
    ["https://jcarlo.vercel.app/5", 5],
    ["https://jcarlo.vercel.app/3", 3],
  ];
  expect(actual).toEqual(expected);
});
