import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PerfilesModule } from './perfiles/perfiles.module';
import { UsuariosModule } from './usuarios/usuarios.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: 5432,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities:[__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      ssl: process.env.POSTGRES_SSL === "true",
      extra: {
        ssl:
          process.env.POSTGRES_SSL === "true"
            ? {
              rejectUnauthorized: false,
            }
            : null,
      },
    }),
    PerfilesModule,
    UsuariosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
