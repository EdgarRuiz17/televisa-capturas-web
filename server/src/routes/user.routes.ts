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
   .get("/", verify, getAllUsers)
   .post("/add", verify, addNewUser)
   .post("/login", logInUser)
   .put("/update/:userId", verify, updateUserById)
   .delete("/delete/:userId", verify, deleteUserById);

export default router;
