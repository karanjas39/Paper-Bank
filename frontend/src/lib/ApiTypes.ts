export interface responseType {
  success: boolean;
  status: number;
  message?: string;
}

export interface userType {
  id: string;
  name: string;
  email: string;
  verified: boolean;
  admin: boolean;
  program: {
    name: string;
    id: number;
  };
  createdAt: string;
  updatedAt: string;
  uploadCount: number;
}

export interface DownloadCellProps {
  fileKey: string;
  status: string;
  courseName: string;
  courseCode: string;
  examType: string;
  year: string;
}

export interface qpType {
  id: number;
  courseCode: string;
  courseName: string;
  year: number;
  examType: string;
  program: {
    name: string;
  };
  user?: {
    name: string;
    email: string;
    program: {
      name: string;
    };
  };
  status: string;
  fileKey: string;
}

export interface signinType extends responseType {
  token: string;
}

export interface allProgramstype extends responseType {
  programs: ProgramType[];
}

export interface ProgramType {
  name: string;
  id: number;
  createdAt: string;
}

export interface userDetailType extends responseType {
  user: userType;
}

export interface QpResponseType extends responseType {
  qps: qpType[];
}

export interface notificationType extends responseType {
  notifications: {
    message: string;
    createdAt: string;
    id: number;
  }[];
}

export interface allUsersType extends responseType {
  users: userType[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalUsers: number;
  };
}
