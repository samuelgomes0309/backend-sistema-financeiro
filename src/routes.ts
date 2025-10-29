import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";

const router = Router();

// Rotas de usuarios
router.post("/users/signin", new CreateUserController().handle);

export { router };
