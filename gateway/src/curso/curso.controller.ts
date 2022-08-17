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
import { CursoService } from './curso.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { FindCursoDto } from './dto/find-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';

@Controller('cursos')
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}

  @Get('/pdf')
  getCursoPdf(@Query() findCursoDto: FindCursoDto) {
    return this.cursoService.getCursoPdf(findCursoDto);
  }

  @Post()
  create(@Body() createCursoDto: CreateCursoDto) {
    return this.cursoService.create(createCursoDto);
  }

  @Get()
  findAll(@Query() findCursoDto: FindCursoDto) {
    return this.cursoService.findAll(findCursoDto);
  }

  @Get(':codigo')
  findOne(@Param('codigo') codigo: string) {
    return this.cursoService.findOne(+codigo);
  }

  @Patch(':codigo')
  update(
    @Param('codigo') codigo: string,
    @Body() updateCursoDto: UpdateCursoDto,
  ) {
    return this.cursoService.update(+codigo, updateCursoDto);
  }

  @Delete(':codigo')
  delete(@Param('codigo') codigo: string) {
    return this.cursoService.delete(+codigo);
  }
}
