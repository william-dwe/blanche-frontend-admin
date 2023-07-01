import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import Upload, {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from 'antd/es/upload';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Form,
  Button,
  Input,
  FormLabel,
  Card,
  TextArea,
  ItemNotFound,
} from '../../..';
import {
  useCreatePromotionMutation,
  useGetPromotionBannerByIdQuery,
  useUpdatePromotionMutation,
} from '../../../../app/features/marketplace/promotionApiSlice';
import { capitalizeFirstLetter } from '../../../../helpers/capitalizeFirstLetter';
import { ICreatePromotionValues } from '../../../../helpers/types/promotion.interface';
import { IErrorResponse } from '../../../../helpers/types/response.interface';
import style from './index.module.scss';
import { rules } from './validation';

interface AddPromotionProps {
  isEdit?: boolean;
}

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return false;
};

const AddPromotion: React.FC<AddPromotionProps> = ({ isEdit = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [createPromotion, { isLoading }] = useCreatePromotionMutation();

  const [imageUrl, setImageUrl] = useState<string>();

  const [file, setFile] = useState<File>();
  const [editPromotion, { isLoading: isEditLoading }] =
    useUpdatePromotionMutation();

  const handleUpload: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>,
  ) => {
    setFile(info.fileList[0].originFileObj as File);
    setImageUrl('');
  };

  const handleCreate = async (formData: FormData) => {
    try {
      await createPromotion(formData).unwrap();
      message.success(
        'Promotion successfully created. You will be redirected to promotion list page.',
      );
      navigate('/promotions');
    } catch (error) {
      const err = error as IErrorResponse;
      message.error(capitalizeFirstLetter(err.message));
    }
  };

  const handleEdit = async (values: ICreatePromotionValues) => {
    if (!id) {
      return;
    }

    const formData = new FormData();

    try {
      if (file) {
        formData.append('image', file);
      }
      formData.append('name', values.name);
      formData.append('description', values.description);

      const val = {
        id: Number(id),
        body: formData,
      };

      await editPromotion(val).unwrap();
      message.success(
        'Promotion successfully updated. You will be redirected to promotion list page.',
      );
      navigate('/promotions');
    } catch (error) {
      const err = error as IErrorResponse;
      message.error(capitalizeFirstLetter(err.message));
    }
  };

  const handleSubmit = (values: ICreatePromotionValues) => {
    const formData = new FormData();
    formData.append('image', file as File);
    formData.append('name', values.name);
    formData.append('description', values.description);

    if (isEdit) {
      return handleEdit(values);
    }

    return handleCreate(formData);
  };

  const uploadButton = (
    <div>
      {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const [form] = useForm();

  const { data: promotion, isLoading: isLoadingPromotion } =
    useGetPromotionBannerByIdQuery(Number(id), {
      skip: !id,
    });

  useEffect(() => {
    if (!promotion) return;
    form.setFieldsValue({
      name: promotion.name,
      description: promotion.description,
      image_url: promotion.image_url,
    });

    setImageUrl(promotion.image_url);
  }, [promotion]);

  if (isEdit && !promotion && !isLoadingPromotion) {
    return (
      <ItemNotFound
        title="Promotion is Not Found"
        body="Please check again your promotion name."
      />
    );
  }

  return (
    <Form className={style.form__promotion} onFinish={handleSubmit} form={form}>
      <Card className={style.form__promotion__item}>
        <div className={style.form__promotion__item__header}>
          <h3 className={style.form__promotion__item__header__title}>
            Promotion Information
          </h3>
        </div>
        <div className={style.form}>
          <FormLabel
            name="name"
            label="Promotion Name"
            rules={rules.name}
            className={style.form__item}
          >
            <Input type="text" className={style.form__item__input} />
          </FormLabel>
          <FormLabel
            className={style.form__item}
            name="description"
            rules={rules.description}
            label="
            Promotion Description"
          >
            <TextArea />
          </FormLabel>
          <FormLabel
            name="avatar"
            className={style.form__item}
            label="Image Banner"
            rules={rules.avatar}
          >
            {' '}
            <Upload
              listType="picture-card"
              className="upload__image"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleUpload}
            >
              {isEdit && imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
              ) : file ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="avatar"
                  style={{ width: '100%' }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </FormLabel>
        </div>
      </Card>
      <div className={style.form__promotion__actions}>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={isLoading || isEditLoading}
        >
          {isEdit ? 'Edit Promotion' : 'Create Promotion'}
        </Button>
      </div>
    </Form>
  );
};

export default AddPromotion;
