import express from "express";
import cors from "cors";
import createHttpError from "http-errors";
import UserRoutes from "./routes/UserRoutes";
import ContentRoutes from "./routes/ContentRoutes";
import mongoose from "mongoose";
import { DB, PORT } from "./config";
import { errorHandler } from "./middleware/errorHanlder";
import morgan from "morgan";
const app = express();
app.use([express.json(), express.urlencoded({ extended: true }), cors()]);

app.use("/api/user", UserRoutes);
app.use("/api/manage-content", ContentRoutes);
app.use(() => {
  throw createHttpError(404, "Route not found");
});

app.use(errorHandler);

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected to db");
    app.listen(PORT, () => {
      console.log(`Listening On PORT ${PORT}`);
    });
  })
  .catch(() => {
    throw createHttpError(501, "Unable to connect database");
  });
