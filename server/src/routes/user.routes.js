import { Router } from "express";
import {
   addNewUser,
   logInUser,
   verifyUserToken,
   updateUserById,
   getAllUsers,
   deleteUserById,
} from "../controllers/usersController";
import verify from "../middlewares/userExtractor";

const router = Router();

router
   .get("/verify", verify, verifyUserToken)
   .get("/", getAllUsers)
   .post("/add", addNewUser)
   .post("/login", logInUser)
   .put("/update/:userId", updateUserById)
   .delete("/delete/:userId", deleteUserById);

export default router;
