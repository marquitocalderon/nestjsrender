import { Injectable } from '@nestjs/common';

import * as fs from 'fs';
import * as path from 'path';

import * as PizZip from 'pizzip';
import * as Docxtemplater from 'docxtemplater';
import * as ImageModule  from 'docxtemplater-image-module-pwndoc';
import { GenerarWordDto } from './dto/generaword.dto';

@Injectable()
export class WordService {


    generateWord(datosDelFrontend: GenerarWordDto) {
        // Define una ruta relativa al archivo y Lee el contenido binario del archivo de plantilla .docx
        const content = fs.readFileSync(

            // // EN DESARROLO LOCAL
            // path.resolve(__dirname, '../../public/docs/prueba.docx'),'binary' 

            // EN PRODUCCION YA PARA SUBIR
            path.resolve(__dirname, '../public/docs/prueba.docx'),
            'binary'
        );

        // const imagen1 = path.resolve(__dirname, '../../public/imagenes/marco.jpg');

        const imagen1 = path.resolve(__dirname, '../public/imagenes/marco.jpg');

        const zip = new PizZip(content);
        const imageOptions = {
            centered: false,
            getImage(tagValue, tagName) {
                console.log({ tagValue, tagName });
                return fs.readFileSync(tagValue);
            },
            getSize() {
                // it also is possible to return a size in centimeters, like this : return [ "2cm", "3cm" ];
                return [500, 500];
            },
        };


        // Crea una instancia de Docxtemplater, configurando opciones como 'paragraphLoop' y 'linebreaks'
        const doc = new Docxtemplater(zip, {
            modules: [new ImageModule(imageOptions)],
        });


        doc.render({
            nombre: datosDelFrontend.nombre,
            edad: datosDelFrontend.edad,
            direccion: datosDelFrontend.direccion,
            'foto': imagen1
    
        });

        const documentoword = doc.getZip().generate({
            type: 'nodebuffer',
            compression: 'DEFLATE',
        });

        return documentoword
    }


}
