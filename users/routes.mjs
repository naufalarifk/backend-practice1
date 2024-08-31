import { Router } from "express"
import UserController from "./UserController.mjs";



const router = Router()

router.get("/", UserController.getAllUsers);


export default router;