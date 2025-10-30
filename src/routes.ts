import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateTransactionController } from "./controllers/transaction/CreateTransactionController";

const router = Router();

// Rotas de usuarios
router.post("/users/signup", new CreateUserController().handle);
router.post("/users/session", new AuthUserController().handle);
router.get("/users/me", isAuthenticated, new DetailUserController().handle);

//Rotas das transações
router.post(
	"/transaction/create",
	isAuthenticated,
	new CreateTransactionController().handle
);

export { router };
