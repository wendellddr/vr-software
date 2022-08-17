import { map } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCursoDto } from './dto/create-curso.dto';
import { FindCursoDto } from './dto/find-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';

@Injectable()
export class CursoService {
  constructor(
    @Inject('BACK_END') private readonly clientBackEnd: ClientProxy,
  ) {}

  create(createCursoDto: CreateCursoDto) {
    const pattern = { message: 'create_curso' };
    const payload = createCursoDto;
    return this.clientBackEnd
      .send<string>(pattern, payload)
      .pipe(map((response: string) => response));
  }

  findAll(findCursoDto: FindCursoDto) {
    const pattern = { message: 'find_all_cursos' };
    const payload = findCursoDto;
    return this.clientBackEnd
      .send<string>(pattern, payload)
      .pipe(map((response: string) => response));
  }

  findOne(codigo: number) {
    const pattern = { message: 'find_one_curso' };
    const payload = codigo;
    return this.clientBackEnd
      .send<string>(pattern, payload)
      .pipe(map((response: string) => response));
  }

  update(codigo: number, updateCursoDto: UpdateCursoDto) {
    const pattern = { message: 'update_curso' };
    const payload = { codigo, updateCursoDto };
    return this.clientBackEnd
      .send<string>(pattern, payload)
      .pipe(map((response: string) => response));
  }

  delete(codigo: number) {
    const pattern = { message: 'delete_curso' };
    const payload = codigo;
    return this.clientBackEnd
      .send<string>(pattern, payload)
      .pipe(map((response: string) => response));
  }

  getCursoPdf(findCursoDto: FindCursoDto) {
    const pattern = { message: 'pdf_aluno' };
    const payload = findCursoDto;
    return this.clientBackEnd
      .send<string>(pattern, payload)
      .pipe(map((response: string) => response));
  }
}
