import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { LoginDto } from './dto/login.dto';
import * as bcryptjs from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';


// PARA USUAR JWT TOKEN SE INSTALA ESTO
// npm install --save @nestjs/jwt

@Injectable()
export class AuthService {

    constructor(
        private readonly usuarioService: UsuariosService,
        private readonly jwtService: JwtService
    ) { }

    async login(datosFronted: LoginDto) {
        const usuario = await this.usuarioService.buscarParaLogin(datosFronted.usuario);
    
        if (!usuario) {
            throw new UnauthorizedException('Usuario Incorrecto');
        }
    
        const passwordValidar = await bcryptjs.compare(datosFronted.password, usuario.password);
    
        if (!passwordValidar) {
            throw new UnauthorizedException('Password Incorrecto');
        }
    
        const payload = { sub: usuario.id_usuario, username: usuario.usuario };
    
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: process.env.ACCESS_TOKEN,
            expiresIn: 60 * 60,
        });
    
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: process.env.REFRESH_TOKEN,
            expiresIn: 60 * 60 * 24 * 7,
        });
    
        return {
            token: accessToken,
            refreshToken: refreshToken,
        };
    }
    



}
