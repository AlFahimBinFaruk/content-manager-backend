import express from "express";
//initialize env variables
import dotenv from "dotenv";
dotenv.config();
//CORS
import cors from "cors";
import createHttpError from "http-errors";
//Routes
import UserRoutes from "./routes/UserRoutes";
import ContentRoutes from "./routes/ContentRoutes";
//MONGOOSE and DB
import mongoose from "mongoose";
import { DB, PORT } from "./config";
//Error handler
import { errorHandler } from "./middleware/errorHanlder";
import morgan from "morgan";
//Initialize the app
const app = express();
app.use([express.json(), express.urlencoded({ extended: true }), cors()]);

//User route
app.use("/api/user", UserRoutes);
//Content Route
app.use("/api/manage-content", ContentRoutes);
//Default Error Route
app.use(() => {
  throw createHttpError(404, "Route not found");
});
//Initialize error handler
app.use(errorHandler);

//Connect the DB app will be initialize only after the DB is connected
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
