import express, { Response, Request, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import { router } from "./routes";

const app = express();

const port = 3333;

//Usar JSON.
app.use(express.json());

//Para liberar todos os ips.
app.use(cors());

//Para usar as rotas.
app.use(router);

//Barreira para tratar erros.
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof Error) {
		return res.status(400).json({
			error: err.message,
		});
	}
	return res.status(500).json({
		status: "error",
		message: "Internal server error!",
	});
});

app.listen(port, () => message());

const message = () => {
	console.log(
		"=========================================================================================="
	);
	console.log(
		"                                  🚀 Servidor Online! 🚀                                 "
	);
	console.log(
		"=========================================================================================="
	);
};
