import { BaseResponsePagination, BaseResponseSuccess } from "@/Hook/lib/axiosClient";

export enum Jurusan {
  RPL = 'RPL',
  TKJ = 'TKJ',
}
export enum NamaKelas {
  X = 'X',
  XI = 'XI',
  XII = 'XII'
}
interface Kelas {
  id_kelas?: number;
  nama_kelas: NamaKelas | string;
  Jurusan: Jurusan | string
  siswa: {
    nama_siswa: string;
  }
}
export interface KelasResponse extends BaseResponsePagination {
  data: Kelas[];
}
export interface KelasListFiler extends Partial<Kelas> {
  page: number,
  pageSize: number
  keyword: string;
}
export interface KelasCreatePayload extends Pick<Kelas, "nama_kelas" | "Jurusan"> { }
export interface KelasUpdatePayload extends Pick<Kelas, "nama_kelas" | "Jurusan" | "id_kelas"> { }
export interface KelasDetail extends Kelas { }
