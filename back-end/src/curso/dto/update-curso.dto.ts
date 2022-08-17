import { PartialType } from '@nestjs/mapped-types';
import { CreateCursoDto } from './create-curso.dto';

export class UpdateCursoDto extends PartialType(CreateCursoDto) {}
export interface UpdateCursoEvent {
  codigo: number;
  updateCursoDto: UpdateCursoDto;
}
