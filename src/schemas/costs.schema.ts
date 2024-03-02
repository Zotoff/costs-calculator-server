import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// making the type of document
export type CostsDocument = Cost & Document;

// create schema
@Schema()
export class Cost {
  @Prop({ reguired: true })
  text: string;
  @Prop({ reguired: true })
  price: number;
  @Prop({ required: true, default: new Date() })
  date: Date;
  @Prop({ required: true, default: '1' })
  userId: string;
}

// Create a schema for class Cost
export const CostsSchema = SchemaFactory.createForClass(Cost);
