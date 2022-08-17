import { PartialType } from '@nestjs/mapped-types';
import { CreateAlunoDto } from './create-aluno.dto';

export class UpdateAlunoDto extends PartialType(CreateAlunoDto) {}

export interface UpdateAlunoEvent {
  codigo: number;
  updateAlunoDto: UpdateAlunoDto;
}
