import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CursoService } from './curso.service';

import { CreateCursoDto } from './dto/create-curso.dto';
import { FindCursoDto } from './dto/find-curso.dto';
import { UpdateCursoEvent } from './dto/update-curso.dto';

@Controller()
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}

  @MessagePattern({ message: 'pdf_curso' })
  getCursoPdf(data: FindCursoDto) {
    return this.cursoService.getCursoPdf(data);
  }

  @MessagePattern({ message: 'create_curso' })
  handleCreateCurso(data: CreateCursoDto) {
    return this.cursoService.create(data);
  }

  @MessagePattern({ message: 'find_all_cursos' })
  handleFindAllCursos(data: FindCursoDto) {
    return this.cursoService.findAll(data);
  }

  @MessagePattern({ message: 'find_one_curso' })
  findOne(data: string) {
    return this.cursoService.findOne(+data);
  }

  @MessagePattern({ message: 'update_curso' })
  update(data: UpdateCursoEvent) {
    return this.cursoService.update(+data.codigo, data.updateCursoDto);
  }

  @MessagePattern({ message: 'delete_curso' })
  delete(data: number) {
    return this.cursoService.delete(+data);
  }
}
