import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LoginDto, RefreshTokenDTO } from './dto/login.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('login')
    login(@Body() datosFronted: LoginDto) {
        return this.authService.login(datosFronted)
    }

    @Post('refresh')
    refreshToken(@Body() datosFronted: RefreshTokenDTO) {
       return this.authService.generarToken_Con_REFRESH_TOKEN(datosFronted)
    }

    

}
