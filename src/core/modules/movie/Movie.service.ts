import { Injectable } from '@nestjs/common';
import {
    MoviesFilterResponse
} from './types';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from 'src/schemas/movie';
import { Model } from 'mongoose';
import { PaginationInput } from 'src/core/common/graphql/inputs/pagination.input';
import { InjectConnection } from '@nestjs/mongoose';
import {paginate} from '../../common/paginate';
import { Connection } from 'mongoose';


@Injectable()
export class MovieService {
    constructor(
        @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
        @InjectConnection() private connection: Connection
    ) {}

    public async filter(
        paginateInput?: PaginationInput,
    ): Promise<MoviesFilterResponse> {
        const {data: movies, total, pagination} = await paginate<MovieDocument>({model: this.movieModel, ...paginateInput})
        return {movies, total, pagination}
    }

    public async create(
        movieObj: Movie
    ): Promise<Movie> {
        const movie = await this.movieModel.findOneAndUpdate({title: movieObj.title}, {$set: movieObj}, {upsert: true})
        return movie!;
    }

    public async bulkCreate(
        movies: Movie[]
    ): Promise<Movie[]> {
        const movieTitles = movies.map(({title}) => title);
        const bulk = this.movieModel.collection.initializeUnorderedBulkOp();
        movies.forEach(({title, ...doc}) => bulk.find({title}).upsert().updateOne({$set: doc}))
        await bulk.execute();
        return this.movieModel.find({title: {$in: movieTitles}});
    }
}
