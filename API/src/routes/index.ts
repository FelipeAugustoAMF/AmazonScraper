// configuration for the API routes
// this file is responsible for configuring the API routes

import { Router } from 'express';
import scrapeRouter from './scrape-routes';

const apiRoutes = Router();

apiRoutes.use('/scrape', scrapeRouter);

export default apiRoutes;
