import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsuariosService } from './usuarios.service';
import { CrearUsuarioDto, UpdateUsuarioDto } from './dto/usuarios.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { PermisoPara } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/enums/role.enum';
import { AUTENTICACION_PARA_EL } from 'src/auth/decorators/auth.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags("USUARIOS")
@Controller('usuarios')
@AUTENTICACION_PARA_EL(Role.ADMIN)
export class UsuariosController {

    constructor(private usuarioService: UsuariosService) { }

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
    postUsuarios(@UploadedFile() imagen: Express.Multer.File, @Body() datosDelFormulario: CrearUsuarioDto,) {
        // Verificar si el mimetype es de una imagen
        // Verificar si se proporcionó una imagen y si es del tipo esperado
        if (imagen && imagen.mimetype.startsWith('image/')) {
            // Si se proporciona una imagen válida, llamar a lid_usuarioa función para procesar la imagen
            return this.usuarioService.crearUsuario(datosDelFormulario, imagen);
        } 

        else if (imagen === undefined){
            return this.usuarioService.crearUsuario(datosDelFormulario, imagen);
        }
        
        else {
            // Si no se proporciona una imagen o es de un tipo no válido, continuar con la actualización sin imagen
            return { message: "POR FAVOR ENVIAR UNA IMAGEN QUE SOLO SEA IMAGEN OK"}
        }
    }

    @Patch(':id_usuario')
    @UseInterceptors(FileInterceptor('imagen'))
    actualizarUsuario(
        @UploadedFile() imagen: Express.Multer.File,
        @Param('id_usuario', ParseIntPipe) id_usuario: number,
        @Body() datosDelFronted: UpdateUsuarioDto
    ) {
        // Verificar si se proporcionó una imagen y si es del tipo esperado
        if (imagen && imagen.mimetype.startsWith('image/')) {
            // Si se proporciona una imagen válida, llamar a la función para procesar la imagen
            return this.usuarioService.actualizarUsuario(id_usuario, datosDelFronted, imagen);
        } 

        else if (imagen === undefined){
            return this.usuarioService.actualizarUsuario(id_usuario, datosDelFronted, imagen);
        }
        
        else {
            // Si no se proporciona una imagen o es de un tipo no válido, continuar con la actualización sin imagen
            return { message: "POR FAVOR ENVIAR UNA IMAGEN QUE SOLO SEA IMAGEN OK"}
        }
    }

}
