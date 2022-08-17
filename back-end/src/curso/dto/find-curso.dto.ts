import { DefaultQueryParams } from 'libs/database/dto/default-query-params.dto';

export class FindCursoDto extends DefaultQueryParams {
  codigo?: string;
  descricao?: string;
}
