import { Router } from "express";
import {
  registerUser,
  loginUser,
  loginWithGoogle,
  updateAccount,
} from "../controllers/UserController";
import { UserDataValidation } from "../validation/UserValidation/UserValidation";
import ProtectRoutes from "../middleware/ProtectRoutes";
import CheckUser from "../middleware/CheckUser";
const router = Router();

//register user(Create new user)
router.post("/", UserDataValidation, registerUser);
//Login user if use exits
router.post("/login", loginUser);
//Login With Google
router.post("/loginWithGoogle", UserDataValidation, loginWithGoogle);

//Update Account(here we will use authorization middware)
router.put(
  "/",
  ProtectRoutes,
  CheckUser,
  updateAccount
);
export default router;
