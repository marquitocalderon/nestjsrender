import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuariosEntity } from './usuarios.entity';
import { PerfilesEntity } from 'src/perfiles/perfiles.entity';
import { CrearUsuarioDto } from './dto/usuarios.dto';
import * as bcryptjs from 'bcryptjs'
// Asegúrate de importar tu entidad PerfilesEntity

@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(UsuariosEntity) private usuarioRepository: Repository<UsuariosEntity>,
        @InjectRepository(PerfilesEntity) private perfilRepository: Repository<PerfilesEntity>,
    ) {}

    obtenerTodosLosUsuarios(){
        return this.usuarioRepository.find({
            order:{
                id_usuario: 'DESC',
            },
            where:{
                estado_usuario: true
            }
        })
    }

    async obtenerPorID(id: number) {
        const usuarioEncontrado = await this.usuarioRepository.findOneBy({
          id_usuario: id,
          estado_usuario: true
        });
    
        if (!usuarioEncontrado) {
          return new HttpException('USUARIO no encontrado', HttpStatus.NOT_FOUND);
        }
    
        if (!usuarioEncontrado.estado_usuario) {
          return new HttpException('USUARIO Eliminado', HttpStatus.NOT_FOUND);
        }
    
        return usuarioEncontrado;
     } 

     async crearUsuario(usuarioFronted: CrearUsuarioDto){

      const perfilEncontrado = await this.perfilRepository.findOneBy({
        id_perfil: usuarioFronted.idperfil,
        estado_perfil: true,
      });
  
      if (!perfilEncontrado) {
        return new HttpException('Perfil no encontrado ', HttpStatus.NOT_FOUND);
      }
  
      const usuarioEncontrado = await this.usuarioRepository.findOneBy({
        usuario: usuarioFronted.usuario,
      });
  
      if (usuarioEncontrado) {
        return new HttpException('Usuario ya existe en la base de datos', HttpStatus.CONFLICT);
      }
  
      const nuevoUsuarioEntity = this.usuarioRepository.create({
        usuario: usuarioFronted.usuario,
        password: await bcryptjs.hash(usuarioFronted.password, 10),
        perfiles: perfilEncontrado,
      });
  
      await this.usuarioRepository.save(nuevoUsuarioEntity);
  
      return { message: 'Se registró correctamente' };
    }
}
