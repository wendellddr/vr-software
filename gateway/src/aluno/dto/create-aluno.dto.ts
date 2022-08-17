import {
  IsArray,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAlunoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  nome: string;

  @IsArray()
  @IsNumberString({}, { each: true })
  cursos_codigo: number[];
}
