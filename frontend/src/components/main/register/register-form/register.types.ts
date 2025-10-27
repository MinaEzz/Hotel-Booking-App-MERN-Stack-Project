export type TError = {
  field: string;
  message: string;
};

export interface IRegisterState {
  success: boolean;
  errors?: TError[];
  message?: string;
}

export interface IRegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
