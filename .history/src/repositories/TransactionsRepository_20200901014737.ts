import { EntityRepository, Repository } from 'typeorm';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const transactions = await this.find();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const income = transactions
      .map(transaction => {
        if (transaction.type === 'income') {
          return transaction.value;
        }
        return 0;
      })
      .reduce((accumulator, actually) => {
        return accumulator + actually;
      }, 0);

    const outcome = transactions
      .map(transaction => {
        if (transaction.type === 'outcome') {
          return transaction.value;
        }
        return 0;
      })
      .reduce((accumulator, actually) => {
        return accumulator + actually;
      }, 0);

    const total = income - outcome;
    const balance = { income, outcome, total };

    return balance;
  }
}

export default TransactionsRepository;
