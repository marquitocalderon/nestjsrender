import { Body, Controller, Get, Post, Param, ParseIntPipe,Patch, Delete } from '@nestjs/common';
import { CrearPerfilDto, UpdatePerfilDTO } from './dto/perfiles.dto';
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
        return this.perfilService.obtenerPorID(id)
    }

    @Post()
    postPerfiles(@Body() datosDelFrontendPerfil: CrearPerfilDto){
        return this.perfilService.insertarPerfiles(datosDelFrontendPerfil)

    }

    @Patch(':id')
    actulizarPerfil(@Param('id', ParseIntPipe) id:number, @Body() datosDelFronted: UpdatePerfilDTO ){
        return this.perfilService.actualizarPerfil(id, datosDelFronted)
    }

    @Delete(':id')
    deletePERFIL(@Param('id', ParseIntPipe) id:number){
        return this.perfilService.deletePerfil(id)
    }

}
