import express from "express";
import cors from "cors";
import { errorHandler } from "./midlewares/error-handler";
import apiRoutes from "./routes";

const app = express();
const port = 8080;

// enabling cors so that the frontend can access the backend from any origin
app.use(cors({
    origin: '*'
}));

app.use('/api', apiRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
