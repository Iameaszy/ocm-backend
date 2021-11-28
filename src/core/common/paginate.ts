import {Paginate, Pagination} from './types'

export const paginate = async <T>({ page = 1, limit = 0, query = {}, model: Model}: Paginate<T>) => {
  const pagination: Pagination = {}
  const skip = (page - 1) * limit;
  const endIndex = page * limit;
  const totalDocumentsCount = await Model.find(query).countDocuments({}).exec();
  const options = { limit };

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
  const data = await Model.find(query).skip(skip).limit(limit).exec();

  return { pagination, data, total: totalDocumentsCount }
}