import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('aluno')
export class AlunoEntity {
  @PrimaryGeneratedColumn()
  codigo: number;

  @Column('varchar', { name: 'nome' })
  nome: string;
}
