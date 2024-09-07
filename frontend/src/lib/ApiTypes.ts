export interface responseType {
  success: boolean;
  status: number;
  message?: string;
}

export interface signinType extends responseType {
  token: string;
}

export interface allProgramstype extends responseType {
  programs: {
    name: string;
    id: number;
  }[];
}
