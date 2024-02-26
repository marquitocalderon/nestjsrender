import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class GenerarWordDto {

    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value)) // Trim whitespaces at the beginning and end
    @IsNotEmpty({ message: 'El campo nombre no debe estar vacío' })
    @IsString({ message: 'El campo nombre tiene que ser una cadena de caracteres' })
    @MinLength(4 , {message: 'El campo nombre debe 4 caracteres como minimo'})
    @MaxLength(16 , {message: 'El campo nombre debe 16 caracteres como maximo'})
    nombre: string;

    
    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value)) // Trim whitespaces at the beginning and end
    @IsNotEmpty({ message: 'El campo edad no debe estar vacío' })
    @IsInt({message: "EDAD DEBER SE NUMERO"})
    edad: number;


    
    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value)) // Trim whitespaces at the beginning and end
    @IsNotEmpty({ message: 'El campo direccion no debe estar vacío' })
    @IsString({ message: 'El campo direccion tiene que ser una cadena de caracteres' })
    @MinLength(4 , {message: 'El campo direccion debe 4 caracteres como minimo'})
    @MaxLength(16 , {message: 'El campo direccion debe 16 caracteres como maximo'})
    direccion: string;


}

