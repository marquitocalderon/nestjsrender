import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [UsuariosModule,
    JwtModule.register({
      global: true,
    }),],
  controllers: [AuthController],
  providers: [AuthService]
})  
export class AuthModule {}
