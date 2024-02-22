import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosEntity } from './usuarios.entity';
import { PerfilesEntity } from 'src/perfiles/perfiles.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

// importar el modulo cloudinaryModule para poder agarrar toda la configuracion y asi usar este modulo en TODOS los archivos que tenga LA CARPETA USUARIOS 

@Module({
  imports: [TypeOrmModule.forFeature([UsuariosEntity, PerfilesEntity]), CloudinaryModule],
  controllers: [UsuariosController],
  providers: [UsuariosService]
})
export class UsuariosModule {}
