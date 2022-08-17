import { DefaultQueryParams } from 'libs/database/dto/default-query-params.dto';

export class FindAlunoDto extends DefaultQueryParams {
  codigo?: number;
  nome?: string;
  curso_descricao?: string;
}
