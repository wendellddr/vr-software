import { DefaultParams } from './defaultParams.interfaces';

export interface CreateCurso {
  descricao: string;
  ementa: string;
}
export type UpdateCurso = CreateCurso;

export interface CursoResponse {
  codigo: string;
  descricao: string;
  ementa: string;
}

export interface GetAllCursosResponse {
  count: number;
  cursos: CursoResponse[];
}

export interface CursoParams extends DefaultParams {
  codigo?: string;
  descricao?: string;
}
