import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

import { CreateAlunoDto } from './dto/create-aluno.dto';
import { FindAlunoDto } from './dto/find-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

@Injectable()
export class AlunoService {
  constructor(
    @Inject('BACK_END') private readonly clientBackEnd: ClientProxy,
  ) {}

  create(createAlunoDto: CreateAlunoDto) {
    const pattern = { message: 'create_aluno' };
    const payload = createAlunoDto;
    return this.clientBackEnd
      .send<string>(pattern, payload)
      .pipe(map((response: string) => response));
  }

  findAll(findAlunoDto: FindAlunoDto) {
    const pattern = { message: 'find_all_alunos' };
    const payload = findAlunoDto;
    return this.clientBackEnd
      .send<string>(pattern, payload)
      .pipe(map((response: string) => response));
  }

  findOne(codigo: number) {
    const pattern = { message: 'find_one_aluno' };
    const payload = codigo;
    return this.clientBackEnd
      .send<string>(pattern, payload)
      .pipe(map((response: string) => response));
  }

  update(codigo: number, updateAlunoDto: UpdateAlunoDto) {
    const pattern = { message: 'update_aluno' };
    const payload = { codigo, updateAlunoDto };
    return this.clientBackEnd
      .send<string>(pattern, payload)
      .pipe(map((response: string) => response));
  }

  remove(codigo: number) {
    const pattern = { message: 'delete_aluno' };
    const payload = codigo;
    return this.clientBackEnd
      .send<string>(pattern, payload)
      .pipe(map((response: string) => response));
  }

  getAlunoPdf(findAlunoDto: FindAlunoDto) {
    const pattern = { message: 'pdf_aluno' };
    const payload = findAlunoDto;
    return this.clientBackEnd
      .send<string>(pattern, payload)
      .pipe(map((response: string) => response));
  }
}
