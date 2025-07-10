import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { verifyPassword } from '../utils/hash-password.util';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    //Inject user service into auth service 
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async signIn(username: string, plainPassword: string): Promise<{acces_token: string}> {
        const user = await this.usersService.findOne(username);
        // if user non exist user not found or invalid credentials
        if (!user) throw new UnauthorizedException('User not found');
        const isMatch = verifyPassword(plainPassword, user.passwordSalt, user.passwordHash)
        if (!isMatch) throw new UnauthorizedException('Invalid password');
        // strip passwordHash and salt before returning it
        const payload = {sub: user._id.toString(), username: user.username}
        return {
            acces_token: await this.jwtService.signAsync(payload)
        }
    }
}
