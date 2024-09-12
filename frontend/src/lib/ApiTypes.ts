export interface responseType {
  success: boolean;
  status: number;
  message?: string;
}

export interface userType {
  name: string;
  email: string;
  verified: boolean;
  admin: boolean;
  createdAt: string;
  updatedAt: string;
  uploadCount: number;
  program: {
    name: string;
  };
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

export interface userDetailType extends responseType {
  user: userType;
}

export interface notificationType extends responseType {
  notifications: {
    message: string;
    createdAt: string;
    id: number;
  }[];
}
