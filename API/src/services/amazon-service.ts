import axios from "axios";
import { JSDOM } from "jsdom";

/// scrapes product data from Amazon based on a search keyword and page number.
export async function scrapeProducts(keyword: string, page: number = 1) {
    // encodes the search term to be URL-safe
    const encodedTerm = encodeURIComponent(keyword);

    const url = `https://www.amazon.com.br/s?k=${encodedTerm as string}`;

    const resp = await axios.get(url, {
        timeout: 30000,
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
        validateStatus: () => true
    });

    const isResponseStatusOK = resp.status >= 200 && resp.status < 300;
    if (!isResponseStatusOK) {
        throw new Error(`Failed to fetch data from Amazon. Amazon likely blocked the access. Status code from amazon: ${resp.status}`);
    }

    const html = resp?.data;
    return extractResults(html);
}

function extractResults(html: string) {
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    const searchResults = Array.from(doc.querySelectorAll('[data-component-type="s-search-result"]'));

    const results = searchResults.map(item => ({
        title: getTitle(item),
        imageUrl: getImageUrl(item),
        rating: getRating(item),
        reviews: getReviewCount(item),
    }));

    return results;
}

// the following functions are used to extract the title, image URL, review count and rating from the search result item
// they try to use selectors that are less likely to change in the future
// but they are still subject to change if Amazon changes its HTML structure

function getTitle(item: Element): string {
    const titleDiv = item.querySelector('[data-cy="title-recipe"]');
    const titleSpan = titleDiv?.querySelector('h2 > span');
    return titleSpan?.textContent?.trim() ?? "";
}

function getImageUrl(item: Element): string {
    const imgSpan = item.querySelector('[data-component-type="s-product-image"]')
    const imgElement = imgSpan?.querySelector('img');
    return imgElement?.getAttribute('src') ?? "";
}

function getReviewCount(item: Element): number | null {
    const raw = item
        ?.querySelector('[data-cy="reviews-block"] a[href*="#customerReviews"]')
        ?.textContent
        ?.trim();

    if (!raw) return null;

    const digits = raw.replace(/\D/g, '');
    if (!digits) return null;

    const count = parseInt(digits, 10);
    return Number.isNaN(count) ? null : count;
}


function getRating(item: Element): number | null {
    const rating = item
        ?.querySelector('[data-cy="reviews-block"]')
        ?.querySelector('[data-cy="reviews-ratings-slot"]')
        ?.textContent
        ?.trim() ?? "";
    return parseRating(rating);
}

// parses the rating from the string returned by Amazon
// the rating is usually in the format "4,5 de 5 estrelas" (www.amazon.com.br) 
// or "4.5 out of 5 stars" (www.amazon.com)
function parseRating(raw: string): number | null {
    const token = raw.trim().split(' ')[0];
    if (!token) return null;

    const normalized = token.replace(',', '.');

    const num = parseFloat(normalized);
    return Number.isNaN(num) ? null : num;
}