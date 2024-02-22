import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CrearPerfilDto {

    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value)) // Trim whitespaces at the beginning and end
    @IsNotEmpty({ message: 'El campo nombre_perfil no debe estar vacío' })
    @IsString({ message: 'El campo nombre_perfil tiene que ser una cadena de caracteres' })
    @MinLength(4 , {message: 'El campo nombre_perfil debe 4 caracteres como minimo'})
    @MaxLength(16 , {message: 'El campo nombre_perfil debe 16 caracteres como maximo'})
    nombre_perfil: string;

}


export class UpdatePerfilDTO {

    @IsOptional()
    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value)) // Trim whitespaces at the beginning and end
    @IsNotEmpty({ message: 'El campo nombre_perfil no debe estar vacío' })
    @IsString({ message: 'El campo nombre_perfil tiene que ser una cadena de caracteres' })
    @MinLength(4 , {message: 'El campo nombre_perfil debe 4 caracteres como minimo'})
    @MaxLength(16 , {message: 'El campo nombre_perfil debe 16 caracteres como maximo'})
    nombre_perfil: string;

}
