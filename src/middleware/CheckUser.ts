import { Request, Response, NextFunction } from "express";
//check if we have all the user creds
const CheckUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  next();
};

export default CheckUser
