import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    TypeOrmModule.forRoot({
      type: (process.env.DB_TYPE as 'postgres') || 'postgres',
      host: process.env.PG_HOST ?? 'db',
      port: Number(process.env.PG_PORT) || 5432,
      username: process.env.PG_USER ?? 'postgres',
      password: process.env.PG_PASSWORD ?? 'postgres',
      database: process.env.PG_DB ?? 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
