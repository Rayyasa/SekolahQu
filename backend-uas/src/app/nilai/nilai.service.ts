import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Nilai } from './nilai.entity';
import { CreateNilaiDto, FindNilaiDto, UpdateNilaiDto } from './nilai.dto';
import { ResponsePagination, ResponseSuccess } from 'src/interface/response.interface';
import BaseResponse from 'src/utils/response/base.response';
import { Mapel } from '../mapel/mapel.entity';
import { Siswa } from '../siswa/siswa.entity';

@Injectable()
export class NilaiService extends BaseResponse {
  constructor(
    @InjectRepository(Nilai)
    private nilaiRepository: Repository<Nilai>,
    @InjectRepository(Siswa)
    private siswaRepository: Repository<Siswa>,
    @InjectRepository(Mapel)
    private mapelRepository: Repository<Mapel>,
  ) {
    super();
  }

  async getAllNilai(query: FindNilaiDto): Promise<ResponsePagination> {
    const { page, pageSize, keyword, nilai_pengetahuan, nilai_keterampilan, limit, semester } = query;

    const filterQuery: { [key: string]: any } = {};
    const filterKeyword = [];

    if (keyword) {
      filterKeyword.push(
        { semester: Like(`%${keyword}%`) },
        { nilai_pengetahuan: Like(`%${keyword}%`) },
        { nilai_keterampilan: Like(`%${keyword}%`) },
        { siswa: { nama: Like(`%${keyword}%`) } },
        { mapel: { nama_mapel: Like(`%${keyword}%`) } },
      );
    } else {
      if (nilai_pengetahuan) {
        filterQuery.nilai_pengetahuan = nilai_pengetahuan;
      }
      if (semester) {
        filterQuery.semester = semester;
      }
      if (nilai_keterampilan) {
        filterQuery.nilai_keterampilan = nilai_keterampilan;
      }
    }

    const total = await this.nilaiRepository.count({
      where: keyword ? filterKeyword : filterQuery,
      relations: ['siswa', 'mapel'],
    });

    const result = await this.nilaiRepository.find({
      where: keyword ? filterKeyword : filterQuery,
      relations: ['siswa', 'mapel'],
      skip: limit,
      take: pageSize,
    });

    return this._Pagination('OK', result, total, page, pageSize);

  }
  async getDetail(id_siswa: number): Promise<ResponseSuccess> {
    // Mencari semua nilai untuk siswa dengan id_siswa tertentu
    const nilaiSiswa = await this.nilaiRepository.find({
      where: { siswa: { id_siswa } },
      relations: ['siswa', 'mapel']
    });

    if (!nilaiSiswa || nilaiSiswa.length === 0) {
      throw new NotFoundException(`Nilai untuk siswa dengan ID ${id_siswa} tidak ditemukan`);
    }

    // Mengembalikan daftar nilai siswa
    return this._Success('Sukses Mendapatkan Detail Nilai Siswa', nilaiSiswa);
  }


  async create(createNilaiDto: CreateNilaiDto): Promise<ResponseSuccess> {
    const { id_siswa, id_mapel, semester, nilai_pengetahuan, nilai_keterampilan } = createNilaiDto;

    // Periksa apakah siswa dengan ID yang diberikan ada di database
    const siswa = await this.siswaRepository.findOne({
      where: {
        id_siswa,
      },
    });
    if (!siswa) {
      throw new NotFoundException(`Siswa dengan ID ${id_siswa} tidak ditemukan`);
    }

    // Periksa apakah mapel dengan ID yang diberikan ada di database
    const mapel = await this.mapelRepository.findOne({
      where: {
        id_mapel,
      },
    });
    if (!mapel) {
      throw new NotFoundException(`Mapel dengan ID ${id_mapel} tidak ditemukan`);
    }

    // Periksa apakah nilai untuk mapel yang sama sudah ada untuk siswa dan semester ini
    const existingNilai = await this.nilaiRepository.findOne({
      where: {
        siswa: { id_siswa },
        mapel: { id_mapel },
        semester: semester,
      },
    });
    if (existingNilai) {
      throw new BadRequestException(
        `Nilai untuk mapel dengan ID ${id_mapel} untuk siswa dengan ID ${id_siswa} pada semester ${semester} sudah ada`,
      );
    }

    const nilai = new Nilai();
    nilai.siswa = siswa;
    nilai.mapel = mapel;
    nilai.semester = semester;
    nilai.nilai_pengetahuan = nilai_pengetahuan;
    nilai.nilai_keterampilan = nilai_keterampilan;

    await this.nilaiRepository.save(nilai);
    return this._Success('Berhasil Membuat Nilai', nilai);
  }

  async updateNilai(id_siswa: number, updateNilaiDto: UpdateNilaiDto): Promise<ResponseSuccess> {
    // Periksa apakah siswa dengan ID yang diberikan ada di database
    const siswa = await this.siswaRepository.findOne({
      where: {
        id_siswa
      }
    });
    if (!siswa) {
      throw new NotFoundException(`Siswa dengan ID ${id_siswa} tidak ditemukan`);
    }

    // Periksa apakah nilai dengan ID yang diberikan ada di database
    const nilai = await this.nilaiRepository.findOne({ where: { siswa: { id_siswa } } });
    if (!nilai) {
      throw new NotFoundException(`Nilai untuk siswa dengan ID ${id_siswa} tidak ditemukan`);
    }

    // Lakukan pembaruan nilai
    const { semester, nilai_pengetahuan, nilai_keterampilan } = updateNilaiDto;

    if (semester) {
      nilai.semester = semester;
    }
    if (nilai_pengetahuan) {
      nilai.nilai_pengetahuan = nilai_pengetahuan;
    }
    if (nilai_keterampilan) {
      nilai.nilai_keterampilan = nilai_keterampilan;
    }

    // Simpan perubahan nilai
    await this.nilaiRepository.save(nilai);
    return this._Success('Berhasil memperbarui nilai', nilai);
  }

  async deleteNilai(id: number): Promise<ResponseSuccess> {
    const nilai = await this.nilaiRepository.findOne({
      where: {
        id_nilai: id
      }
    });
    if (!nilai) {
      throw new NotFoundException(`Nilai dengan ID ${id} tidak ditemukan`);
    }
    await this.nilaiRepository.remove(nilai);
    return this._Success('Berhasil menghapus nilai');
  }
}
