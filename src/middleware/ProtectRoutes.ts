import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

//user model
import User from "../model/UserModel";

//Jwt Payload interface
interface JwtPayload {
  id: string;
}

// see if the user has send the data needed to authorize him
const ProtectRoutes = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];

        //verify
        const { id } = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

        //get user creds from the token
        req.user = await User.findById(id).select("-password");

        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not Authorized");
      }
    }
    //if token is not provided..
    if (!token) {
      res.status(401);
      throw new Error("Not Authorized and no Token Given.");
    }
  }
);

export default ProtectRoutes;
