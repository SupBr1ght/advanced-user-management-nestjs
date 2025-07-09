import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true }) 
  lastname: string;

  @Prop({ required: true })
  firstname: string;

  @Prop()
  passwordSalt: string;

  @Prop()
  passwordHash: string;

}

export const UserSchema = SchemaFactory.createForClass(User);