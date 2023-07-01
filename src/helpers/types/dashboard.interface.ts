export interface IUserActive {
  type: string;
  date: Date;
  value: number;
}

export type IGetDashboardActiveUsersResponse = IUserActive[];

export interface IGetDashboardRequest {
  start_date?: string;
  end_date?: string;
}

export interface IUserConversion {
  date: Date;
  value: number;
}

export type IGetDashboardUserConversionResponse = IUserConversion[];

export interface ISales {
  date: Date;
  rev: number;
  trx: number;
}

export type IGetDashboardSalesResponse = ISales[];

export interface ICustomerSatisfactions {
  date: Date;
  review: number;
  count: number;
}

export type IGetDashboardCustomerSatisfactionsResponse =
  ICustomerSatisfactions[];
