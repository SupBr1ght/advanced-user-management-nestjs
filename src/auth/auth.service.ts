import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { verifyPassword } from '../utils/hash-password.util';

@Injectable()
export class AuthService {
    //Inject user service into auth service 
    constructor(private usersService: UsersService) { }

    async signIn(username: string, plainPassword: string): Promise<any> {
        const user = await this.usersService.findOne(username);

        // if user non exist user not found or invalid credentials
        if (!user) throw new UnauthorizedException('User not found');

        const isMatch = verifyPassword(plainPassword, user.passwordSalt, user.passwordHash)
        if (!isMatch) throw new UnauthorizedException('Invalid password');
        // strip passwordHash and salt before returning it
        const { passwordHash, passwordSalt, ...rest } = user;

        return rest

    }
    
    
    
}
