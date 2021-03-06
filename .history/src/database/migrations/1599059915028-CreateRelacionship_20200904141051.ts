import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class CreateRelacionship1599059915028
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        name: 'TransactionsCategory',
        columnNames: ['category_id'], // nome da coluna que estara na tabela de transactions
        referencedColumnNames: ['id'], // o nome da coluna referenciada nessa foreignkey la na tabela de categories
        referencedTableName: 'categories', // tabela de categorias
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('transactions', 'TransactionsCategory');
  }
}
