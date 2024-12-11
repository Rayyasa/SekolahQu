import { BaseResponsePagination } from "@/Hook/lib/axiosClient";

export enum Hari {
  SENIN = 'SENIN',
  SELASA = 'SELASA',
  RABU = 'RABU',
  KAMIS = 'KAMIS',
  JUMAT = 'JUMAT',
  SABTU = 'SABTU',
}

interface Jadwal {
  id_jadwal?: number;
  kelas: {
    nama_kelas: string;
    id_kelas: number | null | undefined
    Jurusan: string;
  }
  mapel: {
    nama_mapel: string
    id_mapel: number | null | undefined
    guru: {
      id_guru: number;
      nama_guru: string;
    }
  }
  hari: Hari | string;
  jam_mulai: string;
  jam_selesai: string;
}
export interface JadwalResponse extends BaseResponsePagination {
  data: Jadwal[];
}
export interface JadwalListFilter extends Partial<Jadwal> {
  page: number;
  pageSize: number;
  keyword: string;
  dari_jam?: string;
  sampai_jam?: string;
  id_kelas?: number | null | undefined;
  id_mapel?: number | null | undefined;
}
export interface JadwalDetail extends Jadwal { }
export interface JadwalCreatePayload extends Pick<Jadwal, "hari" | "jam_mulai" | "jam_selesai"> {
  id_kelas: number | null | undefined;
  id_mapel: number | null | undefined;
}
export interface JadwalUpdatePayload extends Pick<Jadwal, "hari" | "jam_mulai" | "jam_selesai" | "id_jadwal"> {
  id_kelas: number | null | undefined;
  id_mapel: number | null | undefined;
}