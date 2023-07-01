import { Rule } from 'antd/es/form';

export const rules = {
  name: [
    {
      required: true,
      message: 'Please fill category name',
    },
    {
      min: 2,
      message: 'Category name must be at least 2 characters',
    },
    {
      max: 32,
      message: 'Category name must be at most 32 characters',
    },
    {
      validator: (_: Rule, value: string): Promise<void> => {
        if (!value || value.length < 8 || value.length > 16)
          return Promise.resolve();
        return new Promise((resolve, reject) => {
          if (value.trim() !== value) {
            reject(
              new Error('Username cannot contain leading and trailing spaces.'),
            );
          }
          resolve();
        });
      },
    },
  ],
  level: [
    {
      required: true,
      message: 'Please select category level',
    },
  ],
  parent: [
    {
      required: true,
      message: 'Please select parent category',
    },
  ],
  image: [
    {
      required: true,
      message: 'Please upload category image',
    },
  ],
};
