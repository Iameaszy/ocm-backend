import { FilterQuery, Model } from 'mongoose'

type Paginate<T> = {page?: number, limit?: number, query?: FilterQuery<Document>, model: Model<T>}

type Page = {page: number, per_page: number}

type Pagination = {next?: Page, prev?:Page}


export {Paginate, Pagination} 