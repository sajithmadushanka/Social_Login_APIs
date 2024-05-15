import { PassportSerializer } from "@nestjs/passport";
import { PrismaService } from "src/prisma/prisma.service";

export class SessionSerializer extends PassportSerializer {
    constructor(private readonly prismaService: PrismaService) {
        super();
    }
    serializeUser(user: any, done: CallableFunction) {
        console.log('Serializing:',user);
        done(null, user.id);
    }
    async deserializeUser(userId: string, done: CallableFunction) {
        console.log('Deserializing:',userId);
        const user = await this.prismaService.findUniqueUser({ id: userId });
        if (!user) {
            return done(new Error('User not found'));
        }
        done(null, user);
    }
}