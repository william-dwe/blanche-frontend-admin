import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AdminLayout from '../../components/layouts/Admin/AdminLayout';

const Voucher = lazy(() => import('../../pages/Voucher/VoucherList'));
const AddVoucher = lazy(() => import('../../pages/Voucher/AddVoucher'));
const DuplicateVoucher = lazy(
  () => import('../../pages/Voucher/DuplicateVoucher'),
);
const EditVoucher = lazy(() => import('../../pages/Voucher/EditVoucher'));
const Promotion = lazy(() => import('../../pages/Promotion/PromotionList'));
const AddPromotion = lazy(() => import('../../pages/Promotion/AddPromotion'));
const Login = lazy(() => import('../../pages/Auth/Login'));
const Dashboard = lazy(() => import('../../pages/Dashboard'));
const EditPromotion = lazy(() => import('../../pages/Promotion/EditPromotion'));
const Refund = lazy(() => import('../../pages/Refund'));
const Messages = lazy(() => import('../../pages/Messages'));
const Category = lazy(() => import('../../pages/Category'));
const CategoryList = lazy(() => import('../../pages/CategoryList'));
const NotFound = lazy(() => import('../../pages/NotFound'));

export const router = createBrowserRouter([
  {
    element: <AdminLayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
        children: [],
      },
      {
        path: '/vouchers',
        element: <Voucher />,
        children: [],
      },
      {
        path: '/vouchers/create',
        element: <AddVoucher />,
      },
      {
        path: '/vouchers/copy/:code',
        element: <DuplicateVoucher />,
      },
      {
        path: '/vouchers/edit/:code',
        element: <EditVoucher />,
      },
      {
        path: '/promotions',
        element: <Promotion />,
      },
      {
        path: '/promotions/create-banner',
        element: <AddPromotion />,
      },

      {
        path: '/promotions/edit/:id',
        element: <EditPromotion />,
      },
      {
        path: '/refunds',
        element: <Refund />,
      },
      {
        path: '/categories',
        element: <CategoryList />,
      },
      {
        path: '/categories/create',
        element: <Category />,
      },
      {
        path: '/categories/:id/edit',
        element: <Category />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/refunds/:id/messages',
    element: <Messages />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
