export type TError = {
  field: string;
  message: string;
};

export interface ILoginState {
  success: boolean;
  errors?: TError[];
  message?: string;
}

export interface ILoginFormValues {
  identifier: string;
  password: string;
}
