import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Absensi } from './absensi.entity';
import { Siswa } from '../siswa/siswa.entity';
import { CreateAbsensiDto, UpdateAbsensiDto, FindAllAbsensiDto } from './absensi.dto';
import { ResponsePagination, ResponseSuccess } from 'src/interface/response.interface';
import BaseResponse from 'src/utils/response/base.response';

@Injectable()
export class AbsensiService extends BaseResponse {
  constructor(
    @InjectRepository(Absensi)
    private absensiRepository: Repository<Absensi>,
    @InjectRepository(Siswa)
    private siswaRepository: Repository<Siswa>,
  ) {
    super();
  }

  async findAll(query: FindAllAbsensiDto): Promise<ResponsePagination> {
    const { page, pageSize, keyword, tanggal, status, limit ,sort_by,order_by} = query;

    const filterQuery: { [key: string]: any } = {};
    const filterKeyword = [];

    if (keyword) {
      filterKeyword.push(
        { status: Like(`%${keyword}%`) },
        { siswa: { nama: Like(`%${keyword}%`) } },
      );
    } else {
      if (tanggal) {
        filterQuery.tanggal = tanggal;
      }
      if (status) {
        filterQuery.status = status;
      }
    }

    const total = await this.absensiRepository.count({
      where: keyword ? filterKeyword : filterQuery,
      relations: ['siswa'],
    });

    const result = await this.absensiRepository.find({
      where: keyword ? filterKeyword : filterQuery,
      relations: ['siswa'],
      skip: limit,
      take: pageSize,
      order: {
        [sort_by]: order_by,
      }
    });

    return this._Pagination('OK', result, total, page, pageSize);
  }

  async findOne(id: number): Promise<ResponseSuccess> {
    const absensi = await this.absensiRepository.findOne({ where: { id_absensi: id }, relations: ['siswa'] });
    if (!absensi) {
      throw new NotFoundException(`Absensi dengan ID ${id} tidak ditemukan`);
    }
    return this._Success('Sukses Menemukan Data', absensi);
  }

  async create(createAbsensiDto: CreateAbsensiDto): Promise<ResponseSuccess> {
    const { tanggal, status, id_siswa } = createAbsensiDto;
    const siswa = await this.siswaRepository.findOne({ where: { id_siswa } });
    if (!siswa) {
      throw new NotFoundException(`Siswa dengan ID ${id_siswa} tidak ditemukan`);
    }

    const absensi = new Absensi();
    absensi.tanggal = tanggal;
    absensi.status = status;
    absensi.siswa = siswa;

    await this.absensiRepository.save(absensi);
    return this._Success('Berhasil Membuat Absensi', absensi);
  }

  async update(id: number, updateAbsensiDto: UpdateAbsensiDto): Promise<ResponseSuccess> {
    const absensi = await this.absensiRepository.findOne({ where: { id_absensi: id }, relations: ['siswa'] });
    if (!absensi) {
      throw new NotFoundException(`Absensi dengan ID ${id} tidak ditemukan`);
    }

    const { tanggal, status, id_siswa } = updateAbsensiDto;
    if (tanggal) {
      absensi.tanggal = tanggal;
    }
    if (status) {
      absensi.status = status;
    }
    if (id_siswa) {
      const siswa = await this.siswaRepository.findOne({ where: { id_siswa } });
      if (!siswa) {
        throw new NotFoundException(`Siswa dengan ID ${id_siswa} tidak ditemukan`);
      }
      absensi.siswa = siswa;
    }

    await this.absensiRepository.save(absensi);
    return this._Success('Berhasil Mengupdate Absensi', absensi);
  }

  async remove(id: number): Promise<ResponseSuccess> {
    const deleteResult = await this.absensiRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Absensi dengan ID ${id} tidak ditemukan`);
    }
    return this._Success('Berhasil Menghapus Absensi');
  }
}
