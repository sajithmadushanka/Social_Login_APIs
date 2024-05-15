import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { UserDetails } from 'src/utils/types';
require('dotenv').config();
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private authService: AuthService) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/api/v1/auth/google/redirect',
            scope: ['email', 'profile'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile): Promise<any> {
        
        const userDetails: UserDetails = {
            email: profile.emails[0].value,
            name: profile.displayName,
            picture: profile.photos[0].value,
            oauthProvider: 'google',
            oauthId: profile.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    
        // Call AuthService to handle user data
        const user = await this.authService.validateUser(userDetails);

        return user || null;
    }
}