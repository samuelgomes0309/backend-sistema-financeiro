import prismaClient from "../../prisma";

interface ListRequest {
	user_id: string;
	date: Date;
}

class ListTransactionService {
	async execute({ date, user_id }: ListRequest) {
		if (!user_id) {
			throw new Error("Not authorized");
		}
		if (!date) {
			throw new Error("Date Incorrect");
		}
		const findUser = await prismaClient.user.findFirst({
			where: {
				id: user_id,
			},
		});
		if (!findUser) {
			throw new Error("User not found");
		}
		//Pegar todas transações do dia.
		const startOfDay = new Date(date);
		startOfDay.setHours(0, 0, 0, 0);
		const endOfDay = new Date(date);
		endOfDay.setHours(23, 59, 59, 999);
		//Verificar se há como otimizar a consulta do findUser com essa das transações!
		const transactions = await prismaClient.transactions.findMany({
			where: {
				user_id,
				date: {
					gte: startOfDay,
					lte: endOfDay,
				},
			},
			orderBy: {
				createdAt: "desc",
			},
			select: {
				id: true,
				type: true,
				date: true,
				user_id: true,
				value: true,
				description: true,
			},
		});
		return transactions;
	}
}

export { ListTransactionService };
