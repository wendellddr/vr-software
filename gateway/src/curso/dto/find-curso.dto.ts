import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { DefaultQueryParams } from 'src/libs/dto/default-query-params.dto';

export class FindCursoDto extends DefaultQueryParams {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  codigo?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  descricao?: string;
}
