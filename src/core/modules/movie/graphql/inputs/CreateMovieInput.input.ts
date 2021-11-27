import { InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateMovieInput {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  rated: string;

  @IsNotEmpty()
  released: string;

  @IsNotEmpty()
  plot: string;

  @IsNotEmpty()
  genre: string;
  
  @IsNotEmpty()
  imdbRating: string;

  @IsNotEmpty()
  poster: string;

  @IsNotEmpty()
  year: string;
}