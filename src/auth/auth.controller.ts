import { Body, Controller, Post, HttpCode, HttpStatus, Request, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: CreateUserDto) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    // guard for role
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
