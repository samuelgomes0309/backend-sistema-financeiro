import prismaClient from "../../prisma";

interface DeleteRequest {
	item_id: string;
	user_id: string;
}

class DeleteTransactionService {
	async execute({ item_id, user_id }: DeleteRequest) {
		if (!user_id) {
			throw new Error("Not authorized");
		}
		if (!item_id) {
			throw new Error("Item_id not informed");
		}
		const transaction = await prismaClient.transactions.findFirst({
			where: {
				id: item_id,
				user_id: user_id,
			},
		});
		if (!transaction) {
			throw new Error("Transaction not found or does not belong to the user! ");
		}
		const deleteTransaction = await prismaClient.transactions.delete({
			where: {
				id: item_id,
			},
		});
		return {
			message: "Transação deletada com sucesso!",
			transaction: deleteTransaction,
		};
	}
}

export { DeleteTransactionService };
