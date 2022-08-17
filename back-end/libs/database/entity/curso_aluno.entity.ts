import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AlunoEntity } from './aluno.entity';
import { CursoEntity } from './curso.entity';

@Entity('curso_aluno')
export class CursoAlunoEntity {
  @PrimaryGeneratedColumn()
  codigo: number;

  @OneToOne(() => AlunoEntity, (tbAluno) => tbAluno.codigo)
  @JoinColumn([{ name: 'codigo_aluno', referencedColumnName: 'codigo' }])
  codigo_aluno: AlunoEntity;

  @ManyToOne(() => CursoEntity, (tbCurso) => tbCurso.codigo)
  @JoinColumn([{ name: 'codigo_curso', referencedColumnName: 'codigo' }])
  codigo_curso: CursoEntity;
}
