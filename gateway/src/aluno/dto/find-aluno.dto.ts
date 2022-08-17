import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { DefaultQueryParams } from 'src/libs/dto/default-query-params.dto';

export class FindAlunoDto extends DefaultQueryParams {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  codigo?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nome?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  curso_descricao?: string;
}
