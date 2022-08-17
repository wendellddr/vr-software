import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AlunoController } from './aluno.controller';
import { AlunoService } from './aluno.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BACK_END',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 8888,
        },
      },
    ]),
  ],
  controllers: [AlunoController],
  providers: [AlunoService],
})
export class AlunoModule {}
