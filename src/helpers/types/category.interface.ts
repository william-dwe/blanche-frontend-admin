export interface ICategory {
  name: string;
  url: string;
  id: number;
  slug: string;
  children: ICategory | null;
}

export type IGetCategoriesResponse = ICategory[];

export interface IGetCategoriesRequest {
  level?: number;
}

export interface IGetMarketplaceCategoryByIDResponse {
  name: string;
  slug: string;
  level: number;
  id: number;
  image_url: string;
  parent_id: number;
}

export interface IGetMarketplaceCategoriesResponse {
  total_data: number;
  total_page: number;
  current_page: number;
  categories: {
    name: string;
    slug: string;
    level: number;
    id: number;
  }[];
}

export interface IGetMarketplaceCategoriesRequest {
  limit?: number;
  page?: number;
}

export interface IDeleteMarketplaceCategoryResponse {
  name: string;
}
