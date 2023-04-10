import Express, { Application } from "express";
import cors from "cors";
import logger from "./utils/logger";

const app: Application = Express();

app.use(cors);

app.listen(5050, () => {
  logger.info("App started on port 5050.")
})