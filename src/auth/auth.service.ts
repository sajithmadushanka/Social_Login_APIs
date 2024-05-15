import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDetails } from 'src/utils/types';

@Injectable()
export class AuthService {
    constructor(private prisma:PrismaService){}
   async validateUser(details:UserDetails) {
        const user = await this.prisma.findUniqueUser({email:details.email});
        if(user) return user;

        const newUser:any = await this.prisma.createUser(details);
        console.log('Result:',newUser);
        return newUser;
        
    }
    async findUserById(id:number){
        const user = await this.prisma.findUniqueUser({id});
        return user;
    }


    googleLogin(req) {
        if (!req.user) {
          return 'No user from google';
        }
    
        return {
          message: 'User information from google',
          user: req.user,
        };
      }
   
      async facebookLogin(req) {
        if (!req.user) {
          return 'No user from facebook';
        }
    
        return {
          message: 'User information from facebook',
          user: req.user,
        };
      }
}
