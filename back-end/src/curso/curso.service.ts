import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CursoEntity } from 'libs/database/entity/curso.entity';
import { Repository } from 'typeorm';

import { CreateCursoDto } from './dto/create-curso.dto';
import { FindCursoDto } from './dto/find-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import * as fs from 'fs';
import * as path from 'path';
import { PdfService } from 'src/pdf/pdf.service';
import { CursoAlunoEntity } from 'libs/database/entity/curso_aluno.entity';

@Injectable()
export class CursoService {
  constructor(
    @InjectRepository(CursoEntity)
    private readonly _cursoRepository: Repository<CursoEntity>,
    @InjectRepository(CursoAlunoEntity)
    private readonly _cursoAlunoRepository: Repository<CursoAlunoEntity>,
    private readonly _pdfService: PdfService,
  ) {}

  //Criação do curso
  async create(createCursoDto: CreateCursoDto) {
    const curso = new CursoEntity();
    curso.descricao = createCursoDto.descricao;
    curso.ementa = createCursoDto.ementa;

    //Salva o curso
    await this._cursoRepository.save(curso);

    return curso;
  }

  //Encontrar todos os cursos
  async findAll(findCursoDto: FindCursoDto) {
    const cursosBuilder = this._cursoRepository.createQueryBuilder('cursos');

    //Filtro do codigo
    if (findCursoDto.codigo) {
      cursosBuilder.andWhere('cursos.codigo = :codigo', {
        codigo: findCursoDto.codigo,
      });
    }

    // filtro da descrição
    if (findCursoDto.descricao)
      cursosBuilder.andWhere('lower(cursos.descricao) ilike :descricao', {
        descricao: `%${findCursoDto.descricao.toLowerCase()}%`,
      });

    // Page:Para identificar em qual pagina o usuário está.
    // Limit: Para ter um limite de dados para o usuário.
    cursosBuilder
      .offset(findCursoDto.page || 0)
      .limit(findCursoDto.limit || 10);

    //Caso não ache cursos, acontecerá um erro.
    if (!cursosBuilder) {
      throw new HttpException('Cursos not found', 404);
    }

    //Ordenar os cursos
    cursosBuilder.orderBy('cursos.codigo', 'DESC');

    //Count para saber quantos dados tem na tabela e mostrar para o usuário
    const count = await cursosBuilder.getCount();

    //Cursos para mostrar os dados da tabela para o usuário
    const cursos = await cursosBuilder.getMany();

    return { count, cursos };
  }

  async findOne(codigo: number) {
    //Tenta encontrar um curso com o codigo
    const curso = await this._cursoRepository.findOne({
      where: { codigo },
    });

    //Caso não ache o curso, acontecerá um erro.
    if (!curso) {
      throw new HttpException('Curso not found', 404);
    }

    return curso;
  }

  async update(codigo: number, updateCursoDto: UpdateCursoDto) {
    //Tenta encontrar um curso com o codigo
    let curso = await this._cursoRepository.findOne({
      where: { codigo },
    });

    //Caso não ache o curso, acontecerá um erro.
    if (!curso) {
      throw new HttpException('Curso not found', 404);
    }

    //Junto os dois registros para depois salvar. No caso o registro antigo e os dados novos que o usuário enviou.
    curso = Object.assign(curso, updateCursoDto);

    //Salvo o curso com os novos registros
    await this._cursoRepository.save(curso);

    return curso;
  }

  async delete(codigo: number) {
    //Tenta encontrar um curso com o codigo
    const curso = await this._cursoRepository.findOne({
      where: { codigo },
    });

    //Caso não encontre o curso, acontecerá um erro.
    if (!curso) {
      throw new HttpException('Curso not found', 404);
    }

    //Tenta encontrar a vinculação entre aluno e o curso
    const cursoAlunos = await this._cursoAlunoRepository.find({
      where: { codigo_curso: curso },
    });

    if (cursoAlunos) {
      //Deleta todos os vínculos
      await Promise.all(
        cursoAlunos.map(async (cursoAluno) => {
          await this._cursoAlunoRepository.delete(cursoAluno);
        }),
      );
    }

    //Deleta o curso
    await this._cursoRepository.delete(curso);

    return { success: true };
  }

  async getCursoPdf(findAlunoDto: FindCursoDto) {
    const { cursos } = await this.findAll(findAlunoDto);

    const template = fs.readFileSync(
      path.join(__dirname, '../../templates/curso.pdf.html'),
      'utf8',
    );

    const formatData = {
      cursos,
    };

    const bufferPdf = await this._pdfService.renderPdf(template, formatData);

    return bufferPdf;
  }
}
