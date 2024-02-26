import { Body, Controller, Get, Header, Post, Res } from '@nestjs/common';
import { WordService } from './word.service';
import { GenerarWordDto } from './dto/generaword.dto';
import { Response } from 'express';

@Controller('word')
export class WordController {
    
    constructor(private wordService: WordService){}

    @Get()
    holaword(){
        return "hola estoy compilandosafsaf";
    }

    @Post()
    @Header('Access-Control-Expose-Headers', 'Content-Disposition')
    async generarWord(@Body() datosDelFrontend: GenerarWordDto, @Res() res: Response) {
        const documentoword = this.wordService.generateWord(datosDelFrontend);

        // Set the headers
        res.setHeader('Content-Type', 'application/msword');
        res.setHeader('Content-Disposition', `vengodenestjs`);

        // Send the Word document as the response
        res.send(documentoword);
    }
}
