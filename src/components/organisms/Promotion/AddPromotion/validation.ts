export const rules = {
  name: [
    {
      required: true,
      message: 'Please input promotion name',
    },
    {
      min: 3,
      message: 'Promotion name must be at least 3 characters',
    },
    {
      max: 32,
      message: 'Promotion name must be at most 5 characters',
    },
  ],
  description: [
    {
      required: true,
      message: 'Please input promotion description',
    },
    {
      min: 3,
      message: 'Promotion description must be at least 3 characters',
    },
    {
      max: 75,
      message: 'Promotion description must be at most 75 characters',
    },
  ],
  avatar: [
    {
      required: true,
      message: 'Please upload promotion banner',
    },
  ],
};
