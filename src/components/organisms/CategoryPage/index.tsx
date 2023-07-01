import { message } from 'antd';
import { useWatch } from 'rc-field-form';
import React, { useEffect, useState } from 'react';
import {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useGetMarketplaceCategoryByIDQuery,
  useUpdateMarketplaceCategoryMutation,
} from '../../../app/features/categories/categoriesApi';
import { Button, FormLabel, Input, Select, Card } from '../../atoms';
import { Form, ItemNotFound } from '../../molecules';
import { Form as Aform } from 'antd';
import style from './index.module.scss';
import { rules } from './validation';
import Upload, {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from 'antd/es/upload';
import { PlusOutlined } from '@ant-design/icons';
import { IErrorResponse } from '../../../helpers/types/response.interface';
import { capitalizeFirstLetter } from '../../../helpers/capitalizeFirstLetter';
import { useNavigate, useParams } from 'react-router-dom';

interface IOption {
  label: string;
  value: string;
}

interface IForm {
  name: string;
  level: number;
  images?: UploadFile[];
  parent?: string;
}

const defaultOptions = [
  { label: 'Level 1', value: 1 },
  { label: 'Level 2', value: 2 },
  { label: 'Level 3', value: 3 },
];

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

const getFile = (e: UploadChangeParam<UploadFile>) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const CategoryPage: React.FC = () => {
  const params = useParams();
  const [form] = Aform.useForm();
  const level = useWatch('level', form);
  const navigate = useNavigate();
  const noParent = level === 1;

  const { data, isLoading: isLoadingFetch } = useGetCategoriesQuery(
    { level: level - 1 },
    { skip: noParent || !level },
  );
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: isLoadingUpdate }] =
    useUpdateMarketplaceCategoryMutation();
  const [parentCategories, setParentCategories] = useState<IOption[]>([]);
  const { data: categoryData, isLoading: isLoadingCategory } =
    useGetMarketplaceCategoryByIDQuery(Number(params.id), { skip: !params.id });

  const loading = isLoading || isLoadingUpdate || isLoadingCategory;

  useEffect(() => {
    if (!data) return;
    const options = data.map((item) => ({
      label: item.name,
      value: item.id.toString(),
    }));
    setParentCategories(options);
  }, [data]);

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleUpload: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>,
  ) => {
    setFileList(info.fileList);
  };

  const onFinishForm = async (values: IForm) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      values.images &&
        formData.append('image', values.images[0].originFileObj as File);
      formData.append('parent_id', values.parent?.toString() || '0');
      params.id
        ? await updateCategory({ id: Number(params.id), body: formData })
        : await createCategory(formData).unwrap();
      navigate('/categories');
      message.success(
        params.id
          ? `Category ${categoryData?.name} updated successfully`
          : 'Category created successfully',
      );
    } catch (err) {
      const error = err as IErrorResponse;
      message.error(capitalizeFirstLetter(error.message));
    }
  };

  const initialValues: Partial<IForm> = {
    name: categoryData?.name,
    level: categoryData?.level,
    parent: categoryData?.parent_id.toString(),
    images: [
      {
        uid: '1',
        name: 'Image',
        url: categoryData?.image_url,
        status: 'done',
      },
    ],
  };

  useEffect(() => {
    form.resetFields();
  }, [params.id]);

  if (!data && !isLoadingFetch && params.id) {
    return (
      <ItemNotFound
        title="Category Not Found"
        body="Please check again the category id."
      />
    );
  }

  const renderForm = !params.id || categoryData;
  return (
    <Card className={style.cp}>
      {renderForm && (
        <Form
          name="basic"
          layout="vertical"
          autoComplete="off"
          onFinish={onFinishForm}
          form={form}
          className={style.cp__form}
          initialValues={initialValues}
        >
          <FormLabel
            label="Name"
            name="name"
            rules={rules.name}
            preserve={false}
          >
            <Input placeholder="ex: Audio Digital" />
          </FormLabel>
          <FormLabel
            label="Level"
            name="level"
            rules={rules.level}
            preserve={false}
          >
            <Select placeholder="ex: Level 1" options={defaultOptions} />
          </FormLabel>
          {!noParent && level && (
            <FormLabel
              label="Parent Category"
              name="parent"
              rules={rules.parent}
              preserve={false}
            >
              <Select placeholder="ex: Parent 1" options={parentCategories} />
            </FormLabel>
          )}
          {level === 1 && (
            <FormLabel
              label="Category Image"
              name="images"
              rules={rules.image}
              valuePropName="fileList"
              getValueFromEvent={getFile}
              preserve={false}
            >
              <Upload
                name="file"
                onChange={handleUpload}
                fileList={fileList}
                beforeUpload={beforeUpload}
                listType="picture-card"
                showUploadList={{ showPreviewIcon: false }}
              >
                {fileList?.length >= 1 ? null : (
                  <div className={style.pm__upload}>
                    <PlusOutlined />
                    <p>Upload</p>
                  </div>
                )}
              </Upload>
            </FormLabel>
          )}
          <div className={style.cp__actions}>
            <Button htmlType="reset" danger ghost>
              Reset
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={loading}
            >
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Card>
  );
};

export default CategoryPage;
