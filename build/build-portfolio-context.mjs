import { PlaywrightCrawler } from "crawlee";
import { writeFile } from "node:fs/promises";

const baseUrl = process.env.PORTFOLIO_URL || "http://localhost:5173";
const routes = ["/", "/project-fish", "/projects"];
const pages = [];

const crawler = new PlaywrightCrawler({
  async requestHandler({ request, page, log }) {
    const text = await page.locator("body").innerText();
    pages.push(`PAGE: ${request.url}\n${text}`);
    log.info(`Scraped ${request.url}`);
  },
});

await crawler.run(routes.map((route) => `${baseUrl}${route}`));
await writeFile(
  "portfolio-context.txt",
  `Use this portfolio website content to answer questions:\n\n${pages.join("\n\n")}`,
);

console.log("Generated portfolio-context.txt");