import { IParams } from './types';

const searchParamsKeys = [
  'merchant_id',
  'cat',
  'seller_city_id',
  'q',
  'min_price',
  'max_price',
  'min_rating',
  'limit',
  'page',
  'status',
];
interface IMappedSortOptions {
  [key: string]: {
    sort_dir: string;
    sort_by: string;
  };
}
export const mappedSortOptions: IMappedSortOptions = {
  '1': {
    sort_dir: 'desc',
    sort_by: 'avg_rating',
  },
  '2': {
    sort_dir: 'desc',
    sort_by: 'created_at',
  },
  '3': {
    sort_dir: 'desc',
    sort_by: 'num_of_sale',
  },
  '4': {
    sort_dir: 'asc',
    sort_by: 'min_discount_price',
  },
  '5': {
    sort_dir: 'desc',
    sort_by: 'min_discount_price',
  },
};


export const parseSearchParams = (searchParams: URLSearchParams): IParams => {
  const params: { [key: string]: string } = {};
  const ob = searchParams.get('ob');
  if (ob) {
    params.sort_dir = mappedSortOptions[ob].sort_dir;
    params.sort_by = mappedSortOptions[ob].sort_by;
  }
  searchParamsKeys.forEach((key) => {
    const value = searchParams.get(key);
    if (value) {
      params[key] = value;
    }
  });
  return params;
};

export const deleteAllSearchParams = (
  searchParams: URLSearchParams,
): URLSearchParams => {
  for (const key of searchParamsKeys) {
    searchParams.delete(key);
  }
  
  return searchParams;
};
