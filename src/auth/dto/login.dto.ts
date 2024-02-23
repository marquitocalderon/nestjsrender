import { Transform } from 'class-transformer';
import {IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {

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
}

export class RefreshTokenDTO{
    @IsNotEmpty({ message: 'El campo refresh_token no debe estar vacío' })
    @IsString({ message: 'El campo refresh_token tiene que ser una cadena de caracteres' })
    refresh_token: string;
}
