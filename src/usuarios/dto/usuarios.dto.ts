import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CrearUsuarioDto {

    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value)) // Trim whitespaces at the beginning and end
    @IsNotEmpty({ message: 'El campo usuario no debe estar vacío' })
    @IsString({ message: 'El campo usuario tiene que ser una cadena de caracteres' })
    @MinLength(4 , {message: 'El campo usuario debe 4 caracteres como minimo'})
    @MaxLength(16 , {message: 'El campo usuario debe 16 caracteres como maximo'})
    usuario: string;

    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value)) // Trim whitespaces at the beginning and end
    @IsNotEmpty({ message: 'El campo password no debe estar vacío' })
    @IsString({ message: 'El campo password tiene que ser una cadena de caracteres' })
    @MinLength(4 , {message: 'El campo password debe 4 caracteres como minimo'})
    @MaxLength(16 , {message: 'El campo password debe 16 caracteres como maximo'})
    password: string;

    @IsNotEmpty({ message: 'El idperfil no debe estar vacío' })
    @IsString({message: "el campo idperfil DEBE MANDARSE EN STRING"})
    @MinLength(1 , {message: 'El campo password debe 1 caracteres como minimo'})
    @MaxLength(100 , {message: 'El campo password debe 100 caracteres como maximo'})
    idperfil:string
}

export class UpdateUsuarioDto {

    @IsOptional()
    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value)) // Trim whitespaces at the beginning and end
    @IsNotEmpty({ message: 'El campo usuario no debe estar vacío' })
    @IsString({ message: 'El campo usuario tiene que ser una cadena de caracteres' })
    @MinLength(4 , {message: 'El campo usuario debe 4 caracteres como minimo'})
    @MaxLength(16 , {message: 'El campo usuario debe 16 caracteres como maximo'})
    usuario?: string;

    @IsOptional()
    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value)) // Trim whitespaces at the beginning and end
    @IsNotEmpty({ message: 'El campo password no debe estar vacío' })
    @IsString({ message: 'El campo password tiene que ser una cadena de caracteres' })
    @MinLength(4 , {message: 'El campo password debe 4 caracteres como minimo'})
    @MaxLength(16 , {message: 'El campo password debe 16 caracteres como maximo'})
    password?: string;

    @IsOptional()
    @IsNotEmpty({ message: 'El idperfil no debe estar vacío' })
    @IsString({message: "el campo idperfil DEBE MANDARSE EN STRING"})
    @MinLength(1 , {message: 'El campo password debe 1 caracteres como minimo'})
    @MaxLength(100 , {message: 'El campo password debe 100 caracteres como maximo'})
    idperfil?:string
}



