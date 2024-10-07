import express from 'express';
import { getAllUsers, login } from '../controller/user.js';
const router = express.Router();

router.route("/login").post(login);
router.route("/get").get(getAllUsers);


export const userRouter = router;