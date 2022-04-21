import { Router } from "express";
import {
  getContentList,
  addContent,
  updateContent,
  deleteContent,
  getSingleContentData,
} from "../controllers/ContentController";
import CheckUser from "../middleware/CheckUser";
import ProtectRoutes from "../middleware/ProtectRoutes";
import { ContentDataValidation } from "../validation/ContentValidation/ContentValidation";

const router = Router();

// ***only the user who have created the content can CRUD them **
// **** All Routes are protected****
router
  .route("/")
  //get the content which are created by the specific user.
  .get(ProtectRoutes, CheckUser, getContentList)
  //Add a new content of specific user
  .post(ProtectRoutes, CheckUser, ContentDataValidation, addContent);

router
  .route("/:id")
  //get single user content
  .get(ProtectRoutes, CheckUser, getSingleContentData)
  //Update the content of specific user
  .put(ProtectRoutes, CheckUser, updateContent)
  //Delete the content of specific user
  .delete(ProtectRoutes, CheckUser, deleteContent);

export default router;
