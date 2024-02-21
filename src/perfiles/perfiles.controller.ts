import { Body, Controller, Get, Post, Param, ParseIntPipe } from '@nestjs/common';
import { CrearPerfilDto } from './dto/perfiles.dto';
import { PerfilesService } from './perfiles.service';

@Controller('perfiles')
export class PerfilesController {

    constructor(private perfilService: PerfilesService){}

    @Get()
    getPerfiles(){
        return this.perfilService.obtenerTodoslosPerfiles()
    }

    
    @Get(':id')
    getPerfilById(@Param('id', ParseIntPipe) id:number){
        return this.perfilService.obterporID(id)
    }

    @Post()
    postPerfiles(@Body() datosDelFrontendPerfil: CrearPerfilDto){
        return this.perfilService.insertarPerfiles(datosDelFrontendPerfil)

    }

}
