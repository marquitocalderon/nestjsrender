import { Injectable } from '@nestjs/common';

import * as fs from 'fs';
import * as path from 'path';

import * as PizZip from 'pizzip';
import * as Docxtemplater from 'docxtemplater';
import ImageModule from 'docxtemplater-image-module-pwndoc';
import { GenerarWordDto } from './dto/generaword.dto';

@Injectable()
export class WordService {


    generateWord(datosDelFrontend: GenerarWordDto) {
        // Define una ruta relativa al archivo y Lee el contenido binario del archivo de plantilla .docx
        const content = fs.readFileSync(

            // EN DESARROLO LOCAL
            // path.resolve(__dirname, '../../public/docs/prueba.docx'),

            // EN PRODUCCION YA PARA SUBIR
            path.resolve(__dirname, '../public/docs/prueba.docx'),
            'binary'
        );

        console.log(content);
    }


}
