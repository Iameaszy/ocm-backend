import {Paginate, Pagination} from './types'

export const paginate = async <T>({ page = 1, limit = 0, query = {}, model: Model}: Paginate<T>) => {
  const pagination: Pagination = {}
  const skip = (page - 1) * limit;
  const endIndex = page * limit;
  const totalDocumentsCount = await Model.find(query).countDocuments({}).exec();
  const options = { limit, skip};

  if (endIndex < totalDocumentsCount) {
      pagination.next = {
        page: page + 1,
        per_page: limit
      }
  }

  if (skip > 0) {
      pagination.prev = {
        page: page - 1,
        per_page:limit
      };
  }
  console.log({query, options})
  const data = await Model.find(query, options).exec();

  return { pagination, data, total: totalDocumentsCount }
}