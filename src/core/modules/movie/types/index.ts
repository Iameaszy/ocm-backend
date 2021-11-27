import { Pagination } from 'src/core/common/types';
import { Movie } from 'src/schemas/movie';


export type MoviesFilterResponse = {
    movies: Movie[],
    total: number,
    pagination: Pagination
};
