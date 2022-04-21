import { ErrorRequestHandler } from "express";

//re-write defautl error handler of express ,to handle them properly
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  res.json({ message: err.message });
};
