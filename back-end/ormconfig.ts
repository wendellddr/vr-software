import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
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
