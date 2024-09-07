export interface responseType {
  success: boolean;
  status: number;
  message?: string;
}

export interface signinType extends responseType {
  token: string;
}
