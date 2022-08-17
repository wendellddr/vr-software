import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableCursoAluno1660337256490 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'curso_aluno',
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
            name: 'codigo_aluno',
            type: 'bigint',
            isNullable: false,
          },

          {
            name: 'codigo_curso',
            type: 'bigint',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'curso_aluno',
      new TableForeignKey({
        columnNames: ['codigo_aluno'],
        referencedColumnNames: ['codigo'],
        referencedTableName: 'aluno',
        name: 'curso_aluno_codigo_aluno',
      }),
    );

    await queryRunner.createForeignKey(
      'curso_aluno',
      new TableForeignKey({
        columnNames: ['codigo_curso'],
        referencedColumnNames: ['codigo'],
        referencedTableName: 'curso',
        name: 'curso_aluno_codigo_curso',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('curso_aluno', true, true);
  }
}
