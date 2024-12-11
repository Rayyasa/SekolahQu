import { BaseResponsePagination } from "@/Hook/lib/axiosClient";

export enum semester {
  GANJIL = 'Satu',
  GENAP = 'Dua'
}
interface Nilai {
  id_nilai?: number;
  semester: semester | string;
  nilai_pengetahuan: number | null | undefined;
  nilai_keterampilan: number | null | undefined;
  siswa: {
    id_siswa: number | null | undefined;
    nama_siswa: string
  }
  mapel: {
    id_mapel: number | null | undefined;
    nama_mapel: string
  }
}
export interface NilaiResponse extends BaseResponsePagination {
  data: Nilai[];
}
export interface NilaiListFilter extends Partial<Nilai> {
  page: number;
  pageSize: number;
  keyword: string;
}
export interface NilaiDetail extends Nilai { }
export interface NilaiCreatePayload extends Pick<Nilai, "semester" | "nilai_keterampilan" | "nilai_pengetahuan"> {
  id_siswa: number | null | undefined;
  id_mapel: number | null | undefined;
}
export interface NilaiUpdatePayload extends Pick<Nilai, "semester" | "nilai_keterampilan" | "nilai_pengetahuan" | "id_nilai"> {
  id_mapel: number | null | undefined;
}