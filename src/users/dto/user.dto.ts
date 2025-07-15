import { IsString, IsNotEmpty, IsOptional, IsArray, ArrayNotEmpty } from 'class-validator';

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

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  roles: string[];
}

