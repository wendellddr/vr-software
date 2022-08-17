import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCursoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  descricao: string;

  @IsString()
  @IsNotEmpty()
  ementa: string;
}
