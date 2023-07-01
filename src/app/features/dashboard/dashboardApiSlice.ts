import {
  IGetDashboardRequest,
  IGetDashboardActiveUsersResponse,
  IGetDashboardUserConversionResponse,
  IGetDashboardSalesResponse,
  IGetDashboardCustomerSatisfactionsResponse,
} from '../../../helpers/types';

import { apiSlice } from '../../api/apiSlice';

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getDashboardActiveUsers: build.query<
      IGetDashboardActiveUsersResponse,
      IGetDashboardRequest
    >({
      query: (params) => ({
        url: 'marketplace/dashboards/active-users',
        method: 'GET',
        params,
      }),
      transformResponse: (response: {
        data: IGetDashboardActiveUsersResponse;
      }) => response.data,
      transformErrorResponse: (response) => response.data,
    }),
    getDashboardUserConversion: build.query<
      IGetDashboardUserConversionResponse,
      IGetDashboardRequest
    >({
      query: (params) => ({
        url: 'marketplace/dashboards/user-conversions',
        method: 'GET',
        params,
      }),
      transformResponse: (response: {
        data: IGetDashboardUserConversionResponse;
      }) => response.data,
      transformErrorResponse: (response) => response.data,
    }),
    getDashboardSales: build.query<
      IGetDashboardSalesResponse,
      IGetDashboardRequest
    >({
      query: (params) => ({
        url: 'marketplace/dashboards/sales',
        method: 'GET',
        params,
      }),
      transformResponse: (response: { data: IGetDashboardSalesResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),
    getDashboardCustomerSatisfactions: build.query<
      IGetDashboardCustomerSatisfactionsResponse,
      IGetDashboardRequest
    >({
      query: (params) => ({
        url: 'marketplace/dashboards/customer-satisfactions',
        method: 'GET',
        params,
      }),
      transformResponse: (response: {
        data: IGetDashboardCustomerSatisfactionsResponse;
      }) => response.data,
      transformErrorResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetDashboardActiveUsersQuery,
  useGetDashboardUserConversionQuery,
  useGetDashboardSalesQuery,
  useGetDashboardCustomerSatisfactionsQuery,
} = dashboardApi;
