import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuariosEntity } from './usuarios.entity';
import { PerfilesEntity } from 'src/perfiles/perfiles.entity';
import { CrearUsuarioDto } from './dto/usuarios.dto';
import * as bcryptjs from 'bcryptjs'
import { v2 } from 'cloudinary';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
// Asegúrate de importar tu entidad PerfilesEntity

@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(UsuariosEntity) private usuarioRepository: Repository<UsuariosEntity>,
        @InjectRepository(PerfilesEntity) private perfilRepository: Repository<PerfilesEntity>,
        private readonly cloudinaryService: CloudinaryService,
    ) {}

    obtenerTodosLosUsuarios(){
      return this.usuarioRepository.find({
          select: ["id_usuario", "usuario", "imagen", "estado_usuario", "perfiles"],
          order: {
              id_usuario: 'DESC',
          },
          where: {
              estado_usuario: true
          },
      });
  } 
  
    async obtenerPorID(id: number) {
      const usuarioEncontrado = await this.usuarioRepository.findOne({
          where: {
              id_usuario: id,
              estado_usuario: true,
          },
          select: ["id_usuario", "usuario","imagen","estado_usuario","perfiles"], // Lista de campos que deseas seleccionar
      });
  
      if (!usuarioEncontrado) {
          throw new HttpException('USUARIO no encontrado', HttpStatus.NOT_FOUND);
      }
  
      if (!usuarioEncontrado.estado_usuario) {
          throw new HttpException('USUARIO Eliminado', HttpStatus.NOT_FOUND);
      }
  
      return usuarioEncontrado;
  }
  



     async crearUsuario(usuarioFronted: CrearUsuarioDto, imagen: Express.Multer.File){

      const perfilEncontrado = await this.perfilRepository.findOneBy({
        id_perfil: parseInt(usuarioFronted.idperfil, 10),
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
    
      // Subir la imagen a Cloudinary y obtener la URL
      const cloudinaryResponse = await this.cloudinaryService.uploadFile(imagen);
      const imagenUrl = cloudinaryResponse.secure_url;
    
      const nuevoUsuarioEntity = this.usuarioRepository.create({
        usuario: usuarioFronted.usuario,
        password: await bcryptjs.hash(usuarioFronted.password, 10),
        imagen: imagenUrl,
        perfiles: perfilEncontrado,
      });
    
      await this.usuarioRepository.save(nuevoUsuarioEntity);
    
      return { message: 'Se registró correctamente' };
    }
    
}
