const { crawlPage } = require("./crawl.js");

async function main() {
  try {
    const args = process.argv;
    if (args.length < 3) {
      throw new Error("please input a url");
    } else if (args.length > 3) {
      throw new Error("only one input at a time");
    }
    console.log("please wait while we crawl...");

    const baseURL = args[2];

    const pages = await crawlPage(baseURL, baseURL, {});

    for (const page of Object.entries(pages)) {
      console.log(page);
    }

    return pages;
  } catch (error) {
    console.log(error.message);
  }
}

main();
