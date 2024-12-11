import { BaseResponsePagination, BaseResponseSuccess } from "@/Hook/lib/axiosClient";

export enum jenis_kelamin {
  P = 'Perempuan',
  L = 'Laki-laki'
}

interface Siswa {
  id_siswa?: number;
  nisn: string;
  nama_siswa: string;
  jenis_kelamin: jenis_kelamin | string;
  tempat_lahir: string;
  tanggal_lahir: string;
  photo:string;
  alamat: string;
  kelas: {
    nama_kelas: string;
    id_kelas: number | null | undefined
    Jurusan: string;
  }
}

export interface SiswaResponse extends BaseResponsePagination {
  data: Siswa[];
}
export interface SiswaListFilter extends Partial<Siswa> {
  page: number;
  pageSize: number;
  keyword: string;
}
export interface SiswaDetail extends Siswa { }
export interface SiswaCreatePayload extends Pick<Siswa, "nisn" | "nama_siswa" | "alamat" | "jenis_kelamin" | "tanggal_lahir" | "tempat_lahir" | "photo"> { 
  id_kelas: number | null | undefined
  file?:File
}
export interface SiswaUpdatePayload extends Pick<Siswa, "nisn" | "nama_siswa" | "alamat" | "jenis_kelamin" | "tanggal_lahir" | "tempat_lahir" | "id_siswa" | "photo"> {
  id_kelas: number | null | undefined
  file?:File
}
export interface CreateBulkSiswaDto {
  data: SiswaCreatePayload[];
}
