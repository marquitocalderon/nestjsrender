import { Body, Controller, Get, Post } from '@nestjs/common';
import { WordService } from './word.service';
import { GenerarWordDto } from './dto/generaword.dto';

@Controller('word')
export class WordController {
    
    constructor(private wordService: WordService){}


    @Get()
    holaword(){
        return "hola mundo"
    }

    @Post()
    generarWord(@Body() datosDelFrontend: GenerarWordDto){
        return this.wordService.generateWord(datosDelFrontend)
    }
}
