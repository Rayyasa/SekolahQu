import { BaseResponseSuccess } from "@/Hook/lib/axiosClient";

export enum UserRole {
  ADMIN = 'admin',
  SISWA = 'siswa',
  GURU = 'guru',
}

export interface User {
  id?: number;
  nama: string;
  email: string;
  password: string;
  refresh_token: string;
  access_token: string;
  avatar: string;
  role: UserRole;
}

export interface RegisterResponse extends BaseResponseSuccess { }
export interface LoginPayload extends Pick<User, "email" | "password"> { }
export interface ForgotPassPayload extends Pick<User, "email"> { }
export interface forgotPassResponse extends BaseResponseSuccess {
  data: User
}
export interface LoginResponse extends BaseResponseSuccess {
  data: User;
}
export interface RegisterPayload
  extends Pick<User, "nama" | "email" | "password" | "role"> { }

export interface ProfileResponse extends BaseResponseSuccess {
  data: User;
}

export interface ResetPasswordPayload {
  new_password: string;
}
export interface ResetPassswordResponse extends BaseResponseSuccess {
  data: User;
}
export interface ProfileUpdatePayload extends Pick<User, "nama" | "avatar"> { file?: File }