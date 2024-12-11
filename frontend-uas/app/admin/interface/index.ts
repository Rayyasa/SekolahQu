import { User, UserRole } from "@/app/auth/interface";
import { BaseResponsePagination, BaseResponseSuccess } from "@/Hook/lib/axiosClient";

export interface UserListResponse extends BaseResponsePagination {
  data: User[];
}
export interface UserListFilter {
  page: number;
  pageSize: number;
  role: "admin" | "guru" | "siswa" | "";
  nama: string;
  email: string;
  keyword: ""
}
export interface ProfileResponse extends BaseResponseSuccess {
  data: User;
}