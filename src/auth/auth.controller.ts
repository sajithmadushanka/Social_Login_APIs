import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { FacebookAuthGuard, GoogleAuthGuard } from './utils/Guards';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    @Get('google/login')
    @UseGuards(GoogleAuthGuard)
    handleGoogleLogin() {
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

    @Get('facebook/login')
    @UseGuards(FacebookAuthGuard)
    handleFacebookLogin() {
        return { message: 'Facebook Authentication' };
    }

    @Get('facebook/redirect')
    @UseGuards(FacebookAuthGuard)
    handleFacebookRedirect(@Request() req) {
        const user = this.authService.facebookLogin(req);
        return { 
            message: 'Facebook Redirect',
            user: user
        };
    }
}
