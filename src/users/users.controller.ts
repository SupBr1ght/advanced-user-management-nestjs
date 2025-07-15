import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../users/dto/user.dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @HttpCode(HttpStatus.CREATED)
    @Post('create-user')
    async create(@Body() createUserDTO: CreateUserDto) {
        const newUser = await this.userService.createUser(createUserDTO)
        return newUser;
    }

}
