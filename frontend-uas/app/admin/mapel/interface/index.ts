import { BaseResponsePagination } from "@/Hook/lib/axiosClient";

interface mapel {
  id_mapel?: number;
  nama_mapel: string;
  guru: {
    id_guru: number;
    nama_guru: string;
  };
}
export interface mapelResponse extends BaseResponsePagination {
  data: mapel[];
}
export interface mapelListFilter extends Partial<mapel> {
  page: number;
  pageSize: number;
  keyword: string;
}
export interface MapelDetail extends mapel { }
export interface MapelCreatePayload extends Pick<mapel, "nama_mapel"> {
  id_guru: number | null | undefined
}
export interface MapelUpdatePayload extends Pick<mapel, "nama_mapel" | "id_mapel"> {
  id_guru: number | null | undefined
}