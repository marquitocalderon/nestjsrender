import { Body, Controller, Get, Param, ParseIntPipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsuariosService } from './usuarios.service';
import { CrearUsuarioDto } from './dto/usuarios.dto';

@Controller('usuarios')
export class UsuariosController {

    constructor(private usuarioService: UsuariosService) {}

    @Get()
    getUsuarios() {
        return this.usuarioService.obtenerTodosLosUsuarios();
    }

    @Get(':id')
    getPerfilById(@Param('id', ParseIntPipe) id: number) {
        return this.usuarioService.obtenerPorID(id);
    }

    @Post()
    @UseInterceptors(FileInterceptor('imagen'))
    postUsuarios(@UploadedFile() imagen: Express.Multer.File,  @Body() datosDelFormulario: CrearUsuarioDto,) {
        // Verificar si el mimetype es de una imagen
        if (imagen && imagen.mimetype.startsWith('image/')) {
            // UNA VEZ COMPROBADO QUE LLEGUE  llamar a la función para procesar la imagen aquí
            return this.usuarioService.crearUsuario(datosDelFormulario, imagen);
        } else {
            return{ message :"POR FAVOR ENVIAR UNA IMAGEN QUE SOLO SEA IMAGEN OK "}
        }
    }
}
