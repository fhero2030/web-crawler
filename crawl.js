const { JSDOM } = require("jsdom");

function normalizeURL(urlString) {
  const urlObj = new URL(urlString);

  let pathname = urlObj.pathname;
  if (pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1); // Remove the trailing slash
  }

  return `${urlObj.hostname}${pathname}`;
}

function getURLsFromHTML(htmlBody, baseURL) {
  const dom = new JSDOM(htmlBody);
  const links = dom.window.document.querySelectorAll("a");
  const extractedURLs = [];

  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (href) {
      const absoluteURL = new URL(href, baseURL).href;
      extractedURLs.push(absoluteURL);
    }
  });

  return extractedURLs;
}

async function crawlPage(baseURL, currentURL, pages) {
  const current = new URL(currentURL);
  const base = new URL(baseURL);

  if (current.hostname !== base.hostname) {
    return pages;
  }

  const normalURL = normalizeURL(currentURL);

  if (pages[normalURL] > 0) {
    pages[normalURL]++;
    return pages;
  }

  pages[normalURL] = 1;

  const response = await fetch(baseURL);

  if (!response.headers.get("Content-Type").includes("text/html")) {
    console.log("content-type of the page should be text/html");
    return pages;
  }

  if (response.status > 399) {
    console.log(`error fetching with status code: ${response.status}`);
    return pages;
  }

  const htmlBody = await response.text();

  const nextURLs = getURLsFromHTML(htmlBody, baseURL);

  for (const nextURL of nextURLs) {
    pages = await crawlPage(baseURL, nextURL, pages);
  }

  return pages;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
