import { Injectable , HttpException, HttpStatus} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PerfilesEntity } from './perfiles.entity';
import { Repository } from 'typeorm';
import { CrearPerfilDto } from './dto/perfiles.dto';

@Injectable()
export class PerfilesService {

    constructor(@InjectRepository(PerfilesEntity) private perfilRepository: Repository<PerfilesEntity>) {}

   obtenerTodoslosPerfiles(){
      return this.perfilRepository.find()
   } 

  async obterporID(id){

    const PerfilEncontrado = await this.perfilRepository.findOneBy({
       id_perfil: id,
     })

     if (!PerfilEncontrado){
      return new HttpException('perfil no existe', HttpStatus.FOUND)
     }

    return this.perfilRepository.findOneBy({
      id_perfil: id,
    })
 } 

   async insertarPerfiles(perfil : CrearPerfilDto){

     const PerfilEncontrado = await this.perfilRepository.findOneBy({
      nombre_perfil: perfil.nombre_perfil,
     })

     if (PerfilEncontrado){
      return new HttpException('perfil ya existe', HttpStatus.CONFLICT)
     }

     const nuevoPerfil = this.perfilRepository.create(perfil)
     await this.perfilRepository.save(nuevoPerfil)
     return {perfil: "Se guardo Correctamente"}
    }
}
