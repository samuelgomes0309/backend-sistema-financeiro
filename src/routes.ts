import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";

const router = Router();

// Rotas de usuarios
router.post("/users/signup", new CreateUserController().handle);
router.post("/users/session", new AuthUserController().handle);

export { router };
