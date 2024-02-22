import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosEntity } from './usuarios.entity';
import { PerfilesEntity } from 'src/perfiles/perfiles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsuariosEntity, PerfilesEntity])],
  controllers: [UsuariosController],
  providers: [UsuariosService]
})
export class UsuariosModule {}
