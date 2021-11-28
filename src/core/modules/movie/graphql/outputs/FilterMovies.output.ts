import { Field, ObjectType } from '@nestjs/graphql';
import {Movie} from '../../../../../schemas/movie'


@ObjectType()
class Page {
    @Field()
    page?: number;

    @Field()
    per_page?: number
}

@ObjectType()
class PaginationOutput {
    @Field({nullable: true})
    next?: Page;

    @Field({nullable: true})
    prev?: Page;
}


@ObjectType()
export class FilterMoviesOutput {
    @Field()
    pagination: PaginationOutput;

    @Field()
    total: number;

    @Field(() => [Movie])
    movies: Movie[];
}