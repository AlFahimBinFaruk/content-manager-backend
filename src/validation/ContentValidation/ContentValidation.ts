import { RequestHandler } from "express";
import validator from "../utils/validator";
import { ContentValidationSchema } from "./ContentValidationSchema";

export const ContentDataValidation: RequestHandler = (req, res, next) =>
  validator(ContentValidationSchema, req.body, next);
