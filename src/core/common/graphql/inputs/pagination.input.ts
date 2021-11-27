import { InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class PaginationInput {
    @IsOptional()
    page?: number;

    @IsOptional()
    limit?: number;
}




