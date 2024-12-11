import { BaseResponsePagination } from "@/Hook/lib/axiosClient";
import { jenis_kelamin } from "../siswa/interface";

interface guru {
  id_guru?: number
  nama_guru: string;
  nip: string;
  jenisKelamin: jenis_kelamin | string;
  alamat: string;
  noTelp: string;
  photo: string
}

export interface GuruResponse extends BaseResponsePagination {
  data: guru[];
}
export interface GuruDetail extends guru { }

export interface GuruListFilter extends Partial<guru> {
  page: number;
  pageSize: number;
  keyword: string;
}
export interface CreateGuruPayload extends Pick<guru, 'nama_guru' | "alamat" | "jenisKelamin" | "nip" | "noTelp" | "photo"> { file?: File }
export interface UpdateGuruPayload extends Pick<guru, 'nama_guru' | "alamat" | "jenisKelamin" | "nip" | "noTelp" | "id_guru" | "photo"> { file?: File }


export { jenis_kelamin };
