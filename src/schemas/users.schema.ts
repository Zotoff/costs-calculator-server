import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

// making the type of document
export type usersDocument = User & Document;

// create schema
@Schema()
export class User {
  @Prop({ reguired: true }) // decorator for required prop
  username: string;
  @Prop({ reguired: true }) // decorator for required prop
  password: string;
  _id: mongoose.Types.ObjectId | string;
}

// Create a schema for class User
export const UsersSchema = SchemaFactory.createForClass(User);
