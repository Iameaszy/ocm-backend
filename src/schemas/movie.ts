import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MovieDocument = Movie & Document;

@ObjectType()
@Schema({timestamps: true})
export class Movie {
  @Field()
  _id?: string;

  @Field()
  id?: string;

  @Field()
  @Prop({unique: true})
  title: string;

  @Field()
  @Prop()
  rated: string;

  @Field()
  @Prop()
  released: string;

  @Field()
  @Prop()
  plot: string;

  @Field()
  @Prop()
  genre: string;
  
  @Field()
  @Prop()
  imdbRating: string;

  @Field()
  @Prop()
  poster: string;
  
  @Field()
  @Prop()
  year: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);