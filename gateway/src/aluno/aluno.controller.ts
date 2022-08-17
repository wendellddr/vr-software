import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { FindAlunoDto } from './dto/find-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

@Controller('alunos')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @Get('/pdf')
  getAlunoPdf(@Query() findAlunoDto: FindAlunoDto) {
    return this.alunoService.getAlunoPdf(findAlunoDto);
  }

  @Post()
  create(@Body() createAlunoDto: CreateAlunoDto) {
    return this.alunoService.create(createAlunoDto);
  }

  @Get()
  findAll(@Query() findAlunoDto: FindAlunoDto) {
    return this.alunoService.findAll(findAlunoDto);
  }

  @Get(':codigo')
  findOne(@Param('codigo') codigo: string) {
    return this.alunoService.findOne(+codigo);
  }

  @Patch(':codigo')
  update(
    @Param('codigo') codigo: string,
    @Body() updateAlunoDto: UpdateAlunoDto,
  ) {
    return this.alunoService.update(+codigo, updateAlunoDto);
  }

  @Delete(':codigo')
  remove(@Param('codigo') codigo: string) {
    return this.alunoService.remove(+codigo);
  }
}
