import { Router } from 'express';
import { scrape } from '../controllers/scrape.controller';
import { wrapAsyncHandler } from '../utils/api-utils';

const scrapeRouter = Router();

// root route for the scrape endpoint
// wrapAsyncHandler is a utility function that wraps the scrape function 
// to catch errors and pass them to the error middleware
scrapeRouter.get('/', wrapAsyncHandler(scrape));

export default scrapeRouter;
