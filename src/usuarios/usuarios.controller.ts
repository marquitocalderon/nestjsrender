import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CrearUsuarioDto } from './dto/usuarios.dto';

@Controller('usuarios')
export class UsuariosController {


    constructor(private usuarioService: UsuariosService){}

    @Get()
    getUsuarios(){
        return this.usuarioService.obtenerTodosLosUsuarios()
    }

    @Get(':id')
    getPerfilById(@Param('id', ParseIntPipe) id:number){
        return this.usuarioService.obtenerPorID(id)
    }

    @Post()
    postUsuarios(@Body() datosDelFrontend: CrearUsuarioDto){
        return this.usuarioService.crearUsuario(datosDelFrontend)

    }
}
