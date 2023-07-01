import { Dayjs } from 'dayjs';

export interface ICreateVoucherRequest {
  code: string;
  discount_percentage: number;
  max_discount_nominal: number;
  min_order_nominal: number;
  start_date: Date;
  end_date: Date;
  quota: number;
}

export interface ICreateFormValues {
  code: string;
  discount_percentage: number;
  max_discount_nominal: number;
  min_order_nominal: number;
  period: Dayjs[];
  quota: number;
}

export interface FormReturn<T> {
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
  file?: File;
  setFile?: (file: File) => void;
}

export interface IGetVoucherResponse {
  total_data: number;
  total_page: number;
  current_page: number;
  vouchers: IVoucher[];
}

export interface IGetVoucherRequest {
  q?: string;
  page?: number;
  limit?: number;
}

export interface IVoucher {
  id: number;
  code: string;
  mp_domain: string;
  code_suffix: string;
  discount_percentage: number;
  max_discount_nominal: number;
  min_order_nominal: number;
  start_date: string;
  end_date: string;
  quota: number;
  used_quota: number;
}
