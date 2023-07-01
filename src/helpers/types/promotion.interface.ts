import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import { Dayjs } from 'dayjs';

export interface IGetPromotionResponse {
  total_data: number;
  total_page: number;
  current_page: number;
  promotion_banners: IPromotionBanner[];
}

export interface IPromotionBanner {
  id: number;
  name: string;
  description: string;
  image_url: string;
}

export interface IGetPromotionRequest {
  q?: string;
  page?: number;
  limit?: number;
}

export interface ICreatePromotionValues {
  name: string;
  description: string;
  image: File;
}

export interface FormReturnPromotion<T> {
  handleSubmit: (values: T) => void;
  isLoading?: boolean;
  isError?: boolean;
  error?: Error;
  values?: T;
  handleClick?: () => void;
  onRangeChange?: (
    dates: null | (Dayjs | null)[],
    dateStrings: string[],
  ) => void;
  file: File | undefined;
  handleChangeUpload: (info: UploadChangeParam<UploadFile<File>>) => void;
}
