import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlunoEntity } from 'libs/database/entity/aluno.entity';
import { Repository, In } from 'typeorm';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { FindAlunoDto } from './dto/find-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import * as fs from 'fs';
import * as path from 'path';
import { PdfService } from 'src/pdf/pdf.service';
import { CursoEntity } from 'libs/database/entity/curso.entity';
import { CursoAlunoEntity } from 'libs/database/entity/curso_aluno.entity';
import { CursoAluno } from 'src/interfaces/cursoAluno.interfaces';

@Injectable()
export class AlunoService {
  constructor(
    @InjectRepository(AlunoEntity)
    private readonly _alunoRepository: Repository<AlunoEntity>,
    @InjectRepository(CursoAlunoEntity)
    private readonly _cursoAlunoRepository: Repository<CursoAlunoEntity>,
    @InjectRepository(CursoEntity)
    private readonly _cursoRepository: Repository<CursoEntity>,
    private readonly _pdfService: PdfService,
  ) {}

  //Criação do aluno e vinculação dos cursos
  async create(createAlunoDto: CreateAlunoDto) {
    const aluno = new AlunoEntity();
    aluno.nome = createAlunoDto.nome;

    //Salva o aluno
    await this._alunoRepository.save(aluno);

    //Verifica se existe cursos cadastrados pelo os codigos enviados.
    const cursos = await this._cursoRepository.find({
      where: {
        codigo: In(createAlunoDto.cursos_codigo),
      },
    });

    //Caso não ache os curso, acontecerá um erro.

    if (!cursos.length) {
      throw new HttpException('Cursos not found', 404);
    }

    await Promise.all(
      cursos.map(async (curso) => {
        //Verifico se já tem aluno cadastrado nos cursos
        const hasCursoAluno = await this._cursoAlunoRepository.findOne({
          where: {
            codigo_aluno: aluno,
            codigo_curso: curso,
          },
        });

        //Caso não tenha aluno cadastrado, é enviado para o array a cima
        if (!hasCursoAluno) {
          const newCursoAluno = new CursoAlunoEntity();
          newCursoAluno.codigo_aluno = aluno;
          newCursoAluno.codigo_curso = curso;

          //Salva todos os alunos aos cursos
          await this._cursoAlunoRepository.save(newCursoAluno);
        }

        return { success: true };
      }),
    );

    return aluno;
  }

  //Encontrar todos os alunos
  async findAll(findAlunoDto: FindAlunoDto) {
    const cursosAlunoBuilder = this._cursoAlunoRepository
      .createQueryBuilder('cursos_aluno')
      .innerJoinAndSelect('cursos_aluno.codigo_aluno', 'alunos')
      .innerJoinAndMapMany(
        'cursos_aluno.codigo_curso',
        CursoEntity,
        'cursos',
        'cursos_aluno.codigo_curso = cursos.codigo',
      )
      .select('alunos.codigo', 'aluno_codigo')
      .addSelect('STRING_AGG(cursos."descricao", \', \')', 'curso_descricao')
      .addSelect('alunos.nome', 'aluno_nome')
      .groupBy('cursos_aluno.codigo_aluno')
      .addGroupBy('alunos.codigo');

    //Filtro do codigo
    if (findAlunoDto.codigo) {
      cursosAlunoBuilder.andWhere('alunos.codigo = :codigo', {
        codigo: findAlunoDto.codigo,
      });
    }

    //filtro do nome
    if (findAlunoDto.nome)
      cursosAlunoBuilder.andWhere('lower(alunos.nome) ilike :nome', {
        nome: `%${findAlunoDto.nome.toLowerCase()}%`,
      });

    //filtro da descrição curso
    if (findAlunoDto.curso_descricao)
      cursosAlunoBuilder.andWhere('lower(cursos.descricao) ilike :descricao', {
        descricao: `%${findAlunoDto.curso_descricao.toLowerCase()}%`,
      });

    // Page:Para identificar em qual pagina o usuário está.
    // Limit: Para ter um limite de dados para o usuário.
    cursosAlunoBuilder
      .offset(findAlunoDto.page || 0)
      .limit(findAlunoDto.limit || 10);

    //Count para saber quantos dados tem na tabela e mostrar para o usuário
    const count = await cursosAlunoBuilder.getCount();

    //Ordenar os alunos
    cursosAlunoBuilder.orderBy('alunos.codigo', 'DESC');

    //Alunos para mostrar os dados da tabela para o usuário
    const cursosAluno = (await cursosAlunoBuilder.getRawMany()) as CursoAluno[];

    return { count, cursosAluno };
  }

  async findOne(codigo: number) {
    //Tenta encontrar um aluno com o codigo
    const aluno = await this._alunoRepository.findOne({
      where: { codigo },
    });

    //Caso não ache o aluno, acontecerá um erro.
    if (!aluno) {
      throw new HttpException('Aluno not found', 404);
    }

    const cursosAluno = await this._cursoAlunoRepository.find({
      where: { codigo_aluno: aluno },
      relations: ['codigo_curso'],
    });

    if (!cursosAluno.length) {
      throw new HttpException('Curso Aluno not found', 404);
    }

    return { aluno, cursosAluno };
  }

  async update(codigo: number, updateAlunoDto: UpdateAlunoDto) {
    //Tenta encontrar um aluno com o codigo
    let aluno = await this._alunoRepository.findOne({
      where: { codigo },
    });

    //Caso não ache o aluno, acontecerá um erro.
    if (!aluno) {
      throw new HttpException('Aluno not found', 404);
    }

    //Junto os dois registros para depois salvar. No caso o registro antigo e os dados novos que o usuário enviou.
    aluno = Object.assign(aluno, updateAlunoDto);

    //Salvo o aluno com os novos registros
    await this._alunoRepository.save(aluno);

    const cursosAlunos = await this._cursoAlunoRepository.find({
      where: {
        codigo_aluno: aluno,
      },
    });

    if (!cursosAlunos) {
      throw new HttpException('Curso Aluno not found', 404);
    }

    //Deleta todos os vínculos
    await Promise.all(
      cursosAlunos.map(async (cursoAluno) => {
        await this._cursoAlunoRepository.delete(cursoAluno);
      }),
    );

    const cursos = await this._cursoRepository.find({
      where: { codigo: In(updateAlunoDto.cursos_codigo) },
    });

    if (!cursos) {
      throw new HttpException('Cursos not found', 404);
    }

    await Promise.all(
      cursos.map(async (curso) => {
        const newCursoAluno = new CursoAlunoEntity();
        newCursoAluno.codigo_aluno = aluno;
        newCursoAluno.codigo_curso = curso;

        //Salva todos os alunos aos cursos
        await this._cursoAlunoRepository.save(newCursoAluno);
      }),
    );

    return { success: true };
  }

  async delete(codigo: number) {
    //Tenta encontrar um aluno com o codigo
    const aluno = await this._alunoRepository.findOne({
      where: { codigo },
    });

    //Caso não ache o aluno, acontecerá um erro.
    if (!aluno) {
      throw new HttpException('Aluno not found', 404);
    }

    //Encontra todos os vínculos de aluno com os cursos
    const cursosAlunos = await this._cursoAlunoRepository.find({
      where: { codigo_aluno: aluno },
    });

    if (cursosAlunos) {
      //Deleta todos os vínculos
      await Promise.all(
        cursosAlunos.map(async (cursoAluno) => {
          await this._cursoAlunoRepository.delete(cursoAluno);
        }),
      );
    }

    //Deleta o aluno
    await this._alunoRepository.delete(aluno);

    return { success: true };
  }

  async getAlunoPdf(findAlunoDto: FindAlunoDto) {
    const { cursosAluno } = await this.findAll(findAlunoDto);

    const template = fs.readFileSync(
      path.join(__dirname, '../../templates/aluno.pdf.html'),
      'utf8',
    );

    const formatData = {
      cursosAluno,
    };

    const bufferPdf = await this._pdfService.renderPdf(template, formatData);

    return bufferPdf;
  }
}
