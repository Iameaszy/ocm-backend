import { Injectable } from '@nestjs/common';
import {
    MoviesFilterResponse
} from './types';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from 'src/schemas/movie';
import { Model } from 'mongoose';
import { PaginationInput } from 'src/core/common/graphql/inputs/pagination.input';
import {paginate} from '../../common/paginate';


@Injectable()
export class MovieService {
    constructor(
        @InjectModel(Movie.name) private movieModel: Model<MovieDocument>
    ) {}

    public async filter(
        paginateInput?: PaginationInput,
    ): Promise<MoviesFilterResponse> {
        const {data: movies, total, pagination} = await paginate<MovieDocument>({model: this.movieModel, ...paginateInput})
        console.log({movies, total, pagination})
        return {movies, total, pagination}
    }

    public async create(
        movie: Movie
    ): Promise<Movie> {
        return this.movieModel.create(movie);
    }
}
