import express from "express";
import axios from "axios";
import jsdom from "jsdom";
import { errorHandler } from "./midlewares/error-handler";
const { JSDOM } = jsdom;

const app = express();
const port = 8080;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

function extractResults(html: string) {
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    const searchResults = Array.from(doc.querySelectorAll('[data-component-type="s-search-result"]'));

    const results = searchResults.map(item => {
        const titleDiv = item.querySelector('[data-cy="title-recipe"]');
        const titleSpan = titleDiv?.querySelector('h2 > span');
        const title = titleSpan?.textContent?.trim() ?? "";

        const imgSpan = item.querySelector('[data-component-type="s-product-image"]')
        const imgElement = imgSpan?.querySelector('img');
        const imageUrl = imgElement?.getAttribute('src') ?? "";

        const reviewBlock = item.querySelector('[data-cy="reviews-block"]');

        const rating = reviewBlock
            ?.querySelector('[data-cy="reviews-ratings-slot"]')
            ?.textContent
            ?.trim() ?? '';

        const reviews = reviewBlock
            ?.querySelector('a[href*="#customerReviews"]')
            ?.textContent
            ?.trim() ?? '';

        return { title, imageUrl, rating, reviews };
    });

    return results;
}


app.get('/api/scrape', async (req, res, next) => {
    try {
        debugger;
        const searchTerm = req.query.search;
        const page = req.query.page ?? 1;

        const encodedTerm = encodeURIComponent(searchTerm as string);
        const url = `https://www.amazon.com/s?k=${encodedTerm as string}`;
        console.log(url);

        const resp = await axios.get(url, {
            timeout: 30000,
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
            validateStatus: () => true
        });

        const isOKStatus = resp.status >= 200 && resp.status < 300;
        if (!isOKStatus) {
            res.status(502).json({
                success: false,
                message: `Failed to fetch data from Amazon. Amazon likely blocked the access. Status code from amazon: ${resp.status}`,
                amazonResponse: resp.data
            });
            return;
        }

        const html = resp?.data;
        const results = extractResults(html);
        res.status(200).json(results);
    }
    catch (error: any) {
        next(error);
    }
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});