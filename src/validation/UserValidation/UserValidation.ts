import { RequestHandler } from "express";
import validator from "../utils/validator";
import { UserValidationSchema } from "./UserValidationSchema";

export const UserDataValidation: RequestHandler = (req, res, next) =>
  validator(UserValidationSchema, req.body, next);
