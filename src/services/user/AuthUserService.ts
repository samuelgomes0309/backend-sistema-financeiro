import { sign } from "jsonwebtoken";
import prismaClient from "../../prisma";
import bcrypt from "bcryptjs";

interface AuthRequest {
	email: string;
	password: string;
}

class AuthUserService {
	async execute({ email, password }: AuthRequest) {
		if (!email) {
			throw new Error("Email or password incorrect");
		}
		const user = await prismaClient.user.findFirst({
			where: {
				email: email,
			},
		});
		if (!user) {
			throw new Error("Email or password incorrect");
		}
		const passwordMath = await bcrypt.compare(password, user?.password);
		if (!passwordMath) {
			throw new Error("Email or password incorrect");
		}
		const token = sign(
			{
				name: user.name,
				email: user.email,
			},
			process.env.JWT_SECRET,
			{
				subject: user.id,
				expiresIn: "30d",
			}
		);
		return {
			id: user.id,
			name: user.name,
			email: user.email,
			balance: user.balance,
			token,
		};
	}
}

export { AuthUserService };
