import { Module } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { AlunoController } from './aluno.controller';
import { AlunoEntity } from 'libs/database/entity/aluno.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PdfModule } from 'src/pdf/pdf.module';
import { CursoAlunoEntity } from 'libs/database/entity/curso_aluno.entity';
import { CursoEntity } from 'libs/database/entity/curso.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlunoEntity, CursoAlunoEntity, CursoEntity]),
    PdfModule,
  ],
  controllers: [AlunoController],
  providers: [AlunoService],
})
export class AlunoModule {}
