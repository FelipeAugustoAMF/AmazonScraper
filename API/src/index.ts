import express from "express";
import { errorHandler } from "./midlewares/error-handler";
import apiRoutes from "./routes";

const app = express();
const port = 8080;

app.use('/api', apiRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});