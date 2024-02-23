import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuariosEntity } from './usuarios.entity';
import { PerfilesEntity } from 'src/perfiles/perfiles.entity';
import { CrearUsuarioDto, UpdateUsuarioDto } from './dto/usuarios.dto';
import * as bcryptjs from 'bcryptjs'
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
// Asegúrate de importar tu entidad PerfilesEntity

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(UsuariosEntity) private usuarioRepository: Repository<UsuariosEntity>,
    @InjectRepository(PerfilesEntity) private perfilRepository: Repository<PerfilesEntity>,
    private readonly cloudinaryService: CloudinaryService,
  ) { }

  obtenerTodosLosUsuarios() {
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

  
  buscarParaLogin(usuario: string) {
    return this.usuarioRepository.findOne({
      where: {
        usuario: usuario,
      },
    });
  }


  

  async obtenerPorID(id: number) {
    const usuarioEncontrado = await this.usuarioRepository.findOne({
      where: {
        id_usuario: id,
        estado_usuario: true,
      },
      select: ["id_usuario", "usuario", "imagen", "estado_usuario", "perfiles"], // Lista de campos que deseas seleccionar
    });

    if (!usuarioEncontrado) {
      throw new HttpException('USUARIO no encontrado', HttpStatus.NOT_FOUND);
    }

    if (!usuarioEncontrado.estado_usuario) {
      throw new HttpException('USUARIO Eliminado', HttpStatus.NOT_FOUND);
    }

    return usuarioEncontrado;
  }

  async crearUsuario(usuarioFronted: CrearUsuarioDto, imagen: Express.Multer.File) {

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

    let imagenUrl: string | null = null;  // Inicializa imagenUrl como null

    // Verifica si la imagen está definida antes de intentar subirla a Cloudinary
    if (imagen) {
      const cloudinaryResponse = await this.cloudinaryService.uploadFile(imagen);
      imagenUrl = cloudinaryResponse.secure_url;
    }

    const nuevoUsuarioEntity = this.usuarioRepository.create({
      usuario: usuarioFronted.usuario,
      password: await bcryptjs.hash(usuarioFronted.password, 10),
      imagen: imagenUrl,
      perfiles: perfilEncontrado,
    });

    await this.usuarioRepository.save(nuevoUsuarioEntity);

    return { message: 'Se registró correctamente' };
  }


  async actualizarUsuario(id_usuario: number, datosDelFronted: UpdateUsuarioDto, imagen: Express.Multer.File) {

    const perfilEncontrado = await this.perfilRepository.findOneBy({
      id_perfil: parseInt(datosDelFronted.idperfil, 10),
      estado_perfil: true,
    });

    if (!perfilEncontrado) {
      return new HttpException('Perfil no encontrado ', HttpStatus.NOT_FOUND);
    }


    const usuarioExistente = await this.usuarioRepository.findOneBy({
      id_usuario: id_usuario,
    });

    if (!usuarioExistente) {
      return new HttpException('Usuario no existe', HttpStatus.NOT_FOUND);
    }

    const usuarioEncontrado = await this.usuarioRepository.findOneBy({
      usuario: datosDelFronted.usuario,
    });

    // Verifica si el usuario con el nuevo nombre ya existe, excluyendo al usuario actual
    if (usuarioEncontrado && usuarioEncontrado.id_usuario !== id_usuario) {
      return new HttpException('Usuario ya existe en la base de datos', HttpStatus.CONFLICT);
    }

    // Verifica si el nombre de usuario se ha cambiado antes de comparar con otros usuarios
    if (datosDelFronted.usuario !== usuarioExistente.usuario) {
      const usuarioConMismoNombre = await this.usuarioRepository.findOneBy({
        usuario: datosDelFronted.usuario,
      });

      if (usuarioConMismoNombre) {
        return new HttpException('Usuario con el mismo nombre ya existe', HttpStatus.CONFLICT);
      }
    }



    let imagenUrl: string | null = usuarioExistente.imagen;  // Inicializa imagenUrl con el valor existente



    // Verifica si la imagen está definida antes de intentar subirla a Cloudinary
    if (imagen !== undefined) {
      const cloudinaryResponse = await this.cloudinaryService.uploadFile(imagen);

      if (!cloudinaryResponse) {
        return new HttpException('Error uploading image to Cloudinary', HttpStatus.INTERNAL_SERVER_ERROR);
      }

      imagenUrl = cloudinaryResponse.secure_url;
    }



    // Verifica si se proporciona una nueva contraseña
    let nuevaContraseñaHash: string | null = null;

    if (datosDelFronted.password && datosDelFronted.password.length > 0) {
      // Hash de la nueva contraseña
      nuevaContraseñaHash = await bcryptjs.hash(datosDelFronted.password, 10);
    }

  
    const nuevoUsuarioEntity = this.usuarioRepository.create({
      usuario: datosDelFronted.usuario,
      password: nuevaContraseñaHash ? nuevaContraseñaHash : usuarioExistente.password,
      imagen: imagenUrl,
      perfiles: perfilEncontrado,
  });



    await this.usuarioRepository.update(id_usuario, nuevoUsuarioEntity);

    return { message: 'Actualización exitosa' };
  }


}
