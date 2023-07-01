import { IErrorResponse } from './response.interface';

export interface LoginProps {
  email: string;
  password: string;
}

export interface ILoginResponse {
  access_token: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ErrorLogin {
  email: string;
  password: string;
}

export interface FormReturnAuth<T> {
  handleSubmit: (values: T) => void;
  isLoading?: boolean;
  isError?: boolean;
  error?: Error;
  values?: T;
  handleClick?: () => void;
}

export interface ICheckEmailResponse {
  is_available: boolean;
  email: string;
}

export interface ICheckUsernameResponse {
  is_available: boolean;
  username: string;
}

export interface ICheckUsernameRequest {
  username: string;
}
export interface IRefreshResponse {
  access_token: string;
}

export interface IVerifyCodeRequest {
  verification_code: string;
}

export interface IVerifyCodeResponse {
  access_token: string;
  username: string;
}

export interface IResetPasswordResponse {
  is_email_sent: boolean;
  email: string;
  retry_in: number;
}

export interface ISetNewPasswordRequest {
  password: string;
}

export interface FormReturnPassword {
  handleSubmit: (values: ISetNewPasswordRequest) => void;
  isLoading?: boolean;
  isError?: boolean;
  error?: IErrorResponse;
  values?: ISetNewPasswordRequest;
}
