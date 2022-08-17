import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { AlunoService } from './aluno.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { FindAlunoDto } from './dto/find-aluno.dto';
import { UpdateAlunoEvent } from './dto/update-aluno.dto';

@Controller()
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @MessagePattern({ message: 'pdf_aluno' })
  getAlunoPdf(data: FindAlunoDto) {
    return this.alunoService.getAlunoPdf(data);
  }

  @MessagePattern({ message: 'create_aluno' })
  handleCreateAluno(data: CreateAlunoDto) {
    return this.alunoService.create(data);
  }

  @MessagePattern({ message: 'find_all_alunos' })
  handleFindAllAluno(data: FindAlunoDto) {
    return this.alunoService.findAll(data);
  }

  @MessagePattern({ message: 'find_one_aluno' })
  findOne(data: string) {
    return this.alunoService.findOne(+data);
  }

  @MessagePattern({ message: 'update_aluno' })
  update(data: UpdateAlunoEvent) {
    return this.alunoService.update(+data.codigo, data.updateAlunoDto);
  }

  @MessagePattern({ message: 'delete_aluno' })
  delete(data: number) {
    return this.alunoService.delete(+data);
  }
}
