import { Module } from '@nestjs/common';
import { MovieService } from './Movie.service';
import { MovieResolver } from './Movie.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from 'src/schemas/movie';


@Module({
  imports: [MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }])],
  providers: [MovieService, MovieResolver],
  exports: [MovieService, MovieResolver],
})
export class MovieModule { }
