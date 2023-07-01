import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout } from '../features/auth/authSlice';
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  credentials: 'include',
});

const baseQueryWithReauth: typeof baseQuery = async (
  args,
  api,
  extraOptions,
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    const { status } = result.error;
    if (status === 403) {
      window.location.href = '/';
    } else if (status === 401) {
      const refreshResult = await baseQuery('/refresh', api, extraOptions);
      result = await baseQuery(args, api, extraOptions);
      if (refreshResult.error) {
        api.dispatch(logout());
      }
      return result;
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Vouchers', 'User', 'Promotions', 'Refund', 'Message', 'Category'],
  endpoints: () => ({}),
});
