import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { hashPassword } from '../utils/hash-password.util';
import { CreateUserDto } from './dto/user.dto';


@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) { }

  async createUser(createUserDto: CreateUserDto) {
    // get hash and salt from new hashed password
    const { username, lastname, firstname, password, roles } = createUserDto;

    const { hash, salt } =  hashPassword(password);

    //create new a  new user  
      const newUser = {
      username,
      lastname,
      firstname: firstname || undefined,   
      passwordHash: hash,
      passwordSalt: salt,
      roles
    };
    //save it into the data base
    const createdUser = new this.userModel(newUser);
    return createdUser.save();
  }

  async findOne(username: string): Promise<UserDocument | null> {
    const user = await this.userModel.findOne({ username }).exec();
    //if user non exist return undefined
    return user 
  }
}
