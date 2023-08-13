const { crawlPage } = require("./crawl.js");
const { printReport } = require("./report.js");

async function main() {
  try {
    const args = process.argv;
    if (args.length < 3) {
      throw new Error("please input a url");
    } else if (args.length > 3) {
      throw new Error("only one input at a time");
    }
    console.log("Crawling start...");

    const baseURL = args[2];

    const pages = await crawlPage(baseURL, baseURL, {});

    printReport(pages);
  } catch (error) {
    console.log(error.message);
  }
}

main();
