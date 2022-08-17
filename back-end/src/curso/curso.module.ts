import { Module } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CursoController } from './curso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CursoEntity } from 'libs/database/entity/curso.entity';
import { PdfModule } from 'src/pdf/pdf.module';
import { CursoAlunoEntity } from 'libs/database/entity/curso_aluno.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CursoEntity, CursoAlunoEntity]),
    PdfModule,
  ],
  controllers: [CursoController],
  providers: [CursoService],
})
export class CursoModule {}
