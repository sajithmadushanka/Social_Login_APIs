import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './utils/Guards';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    @Get('google/login')
    @UseGuards(GoogleAuthGuard)
    handleLogin() {
        return { message: 'Google Authentication' };
    }
    @Get('google/redirect')
    @UseGuards(GoogleAuthGuard)
    handleRedirect(@Request() req) {
        const user = this.authService.googleLogin(req);
        return { 
            message: 'Google Redirect',
            user: user
        };
    }
}
