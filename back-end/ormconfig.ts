import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: '192.168.0.101',
  port: 5432,
  username: 'postgres',
  password: 'teste123',
  database: 'vr-software',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrationsRun: false,
  logging: false,
  migrations: [__dirname + '/libs/database/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'libs/database/migrations',
  },
};

export = config;
