import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { Strategy } from 'passport-facebook';



export class FaceBookStrategy extends PassportStrategy(Strategy, 'facebook') {
    constructor(
        private readonly authService: AuthService,
    ) {
        super({
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/facebook/redirect',
            scope: 'email',
            profileFields: ['id', 'emails', 'name'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: CallableFunction) {
        const user = await this.authService.facebookLogin(profile);
        done(null, user);
        console.log('user', user)
    }
}