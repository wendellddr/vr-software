import { Module } from '@nestjs/common';

import { AlunoModule } from './aluno/aluno.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CursoModule } from './curso/curso.module';

@Module({
  imports: [AlunoModule, CursoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
