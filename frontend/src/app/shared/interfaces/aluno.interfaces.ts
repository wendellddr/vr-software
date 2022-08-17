import { DefaultParams } from './defaultParams.interfaces';

export interface CreateAluno {
  nome: string;
}
export type UpdateAluno = CreateAluno;

export interface AlunoResponse {
  aluno_codigo: string;
  aluno_nome: string;
  curso_descricao: string;
}

export interface GetOneAluno {
  aluno: Aluno;
  cursosAluno: CursosAluno[];
}

export interface GetAllAlunoResponse {
  count: number;
  cursosAluno: AlunoResponse[];
}

export interface AlunosParams extends DefaultParams {
  codigo?: string;
  nome?: string;
}

export interface Aluno {
  codigo: string;
  nome: string;
}

export interface CodigoCurso {
  codigo: string;
  descricao: string;
  ementa: string;
}

export interface CursosAluno {
  codigo: string;
  codigo_curso: CodigoCurso;
}
