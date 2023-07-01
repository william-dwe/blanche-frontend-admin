import { message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useCreateVoucherMutation,
  useUpdateVoucherMutation,
} from '../../../../app/features/marketplace/voucherApiSlice';
import {
  FormReturn,
  ICreateFormValues,
  ICreateVoucherRequest,
} from '../../../../helpers/types/voucher.interface';

function useForms(isEdit: boolean): FormReturn<ICreateFormValues> {
  const navigate = useNavigate();

  const [createVoucher, { isError, isLoading }] = useCreateVoucherMutation();
  const [editVoucher, { isError: isEditError, isLoading: isEditLoading }] =
    useUpdateVoucherMutation();
  const [error, setError] = useState<Error>();

  const handleCreate = async (values: ICreateFormValues) => {
    try {
      const body: ICreateVoucherRequest = {
        code: ('BLANCHE' + values.code).toUpperCase(),
        discount_percentage: values.discount_percentage,
        min_order_nominal: values.min_order_nominal,
        max_discount_nominal: values.max_discount_nominal,
        start_date: values.period[0].toDate(),
        end_date: values.period[1].toDate(),
        quota: values.quota,
      };

      await createVoucher(body).unwrap();
      message.success(
        'Voucher successfully created. You will be redirected to voucher list page.',
      );
      navigate('/vouchers');
    } catch (error) {
      setError(error as Error);
    }
  };

  const handleEdit = async (values: ICreateFormValues) => {
    try {
      const body: ICreateVoucherRequest = {
        code: ('BLANCHE' + values.code).toUpperCase(),
        discount_percentage: values.discount_percentage,
        min_order_nominal: values.min_order_nominal,
        max_discount_nominal: values.max_discount_nominal,
        start_date: values.period[0].toDate(),
        end_date: values.period[1].toDate(),
        quota: values.quota,
      };

      await editVoucher(body).unwrap();
      message.success(
        'Voucher successfully updated. You will be redirected to voucher list page.',
      );
      navigate('/vouchers');
    } catch (error) {
      setError(error as Error);
    }
  };

  const handleSubmit = (values: ICreateFormValues) => {
    if (isEdit) {
      return handleEdit(values);
    }

    return handleCreate(values);
  };

  return {
    handleSubmit,
    isError: isError || isEditError,
    isLoading: isLoading || isEditLoading,
    error,
  };
}

export default useForms;
