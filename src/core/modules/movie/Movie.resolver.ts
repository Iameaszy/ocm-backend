import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { PaginationInput } from 'src/core/common/graphql/inputs/pagination.input';
import { FilterMoviesOutput } from './graphql/outputs/FilterMovies.output';
import { Movie } from 'src/schemas/movie';
import { MovieService } from './Movie.service';
import { CreateMovieInput } from './graphql/inputs/CreateMovieInput.input';


@Resolver(() => Movie)
export class MovieResolver {
    constructor(private movieService: MovieService) {}

    @Query(() => FilterMoviesOutput)
    private async fetchMovies(
        @Args({
            name: 'pagination',
            nullable: true,
            type: () => PaginationInput,
            defaultValue: '',
        }) pagination?: {limit: number, page: number}) {

        return this.movieService.filter(pagination);
    }

    @Mutation(() => Movie)
    private async createMovie(
        @Args('movie') movie: CreateMovieInput,
    ): Promise<Movie> {
        return this.movieService.create(movie);
    }

    @Mutation(() => [Movie])
    private async createMovies(
        @Args({ name: 'movies', type: () => [CreateMovieInput] }) movies: CreateMovieInput[],
    ): Promise<Movie[]> {
        return this.movieService.bulkCreate(movies);
    }
}