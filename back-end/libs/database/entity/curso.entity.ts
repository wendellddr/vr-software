import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('curso')
export class CursoEntity {
  @PrimaryGeneratedColumn()
  codigo: number;

  @Column('varchar', { name: 'descricao' })
  descricao: string;

  @Column('text', { name: 'ementa' })
  ementa: string;
}
