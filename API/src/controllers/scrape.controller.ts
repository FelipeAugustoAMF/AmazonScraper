// the controllers are what control the flow of requests and responses related to given resource
// in this case, the resource is the scrape endpoint
// if this API were to grow, we would have a controller for each resource

import type { Request, Response } from 'express';
import { scrapeProducts } from '../services/amazon-service';

export async function scrape(req: Request, res: Response) {
    const keyword = String(req.query.keyword ?? "");
    const page = Number(req.query.page ?? 1);

    const results = await scrapeProducts(keyword, page);
    res.status(200).json(results);
}