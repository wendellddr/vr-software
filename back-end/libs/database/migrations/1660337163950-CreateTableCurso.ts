import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableCurso1660337163950 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'curso',
        columns: [
          {
            name: 'codigo',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            isUnique: true,
          },
          {
            name: 'descricao',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'ementa',
            type: 'text',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('curso', true);
  }
}
