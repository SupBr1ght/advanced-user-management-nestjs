import { Prop } from '@nestjs/mongoose';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty() 
  @IsString()
  username: string;

  @IsOptional() 
  @IsString()
  firstname: string;

  @IsNotEmpty() 
  @IsString()
  lastname: string;  

  @IsNotEmpty() 
  @IsString()
  password: string
}

