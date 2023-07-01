export interface IUser {
  id?: number;
  fullname?: string;
  email?: string;
  password: string;
  address?: string;
  photo?: string;
  role?: string;
}
export interface IErrorResponse {
  message: string;
  data: string;
  code: string;
}
