import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseResponse from 'src/utils/response/base.response';
import { ResponsePagination, ResponseSuccess } from 'src/interface/response.interface';
import { Like, Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Kelas } from './kelas.entity';
import { CreateKelasDto, UpdateKelasDto, findKelas } from './kelas.dto';
import { Siswa } from '../siswa/siswa.entity';
@Injectable()
export class KelasService extends BaseResponse {
  constructor(
    @InjectRepository(Kelas)
    private readonly kelasRepo: Repository<Kelas>,//
    @InjectRepository(Siswa)
    private readonly siswaRepo: Repository<Siswa>
  ) {
    super();
  }
  async getAllKelas(query: findKelas): Promise<ResponsePagination> {
    const { page, pageSize, limit, nama_kelas, Jurusan, keyword } = query;

    const filterQuery: { [key: string]: any } = {};
    const filterKeyword = [];

    if (keyword) {
      filterKeyword.push(
        {
          nama_kelas: Like(`%${keyword}%`),
        },
        {
          Jurusan: Like(`%${keyword}%`),
        }
      )

    } else {
      if (nama_kelas) {
        filterQuery.nama_kelas = Like(`%${nama_kelas}%`);
      }
      if (Jurusan) {
        filterQuery.Jurusan = Like(`%${Jurusan}%`);
      }
    }
    const total = await this.kelasRepo.count({
      where: filterQuery,
    });
    const result = await this.kelasRepo.find({
      where: keyword ? filterKeyword : filterQuery,
      skip: limit,
      take: pageSize,
    });

    return this._Pagination('OK', result, total, page, pageSize);
  }
  async createKelas(createKelasDto: CreateKelasDto): Promise<ResponseSuccess> {
    const { nama_kelas, Jurusan } = createKelasDto;

    await this.kelasRepo.save({
      nama_kelas,
      Jurusan
    });
    return this._Success('Berhasil membuat Kelas',)

  }


  async remove(id: string): Promise<ResponseSuccess> {
    const deleteResult = await this.kelasRepo.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Kelas dengan ID ${id} tidak ditemukan`);
    }
    return this._Success('Berhasil Menghapus Kelas')
  }
  async getDetail(id: number): Promise<ResponseSuccess> {
    const kelas = await this.kelasRepo.findOne({
      where: {
        id_kelas: id,
      },
      relations: ['siswa']
    });




    console.log(kelas);

    if (kelas === null) {
      throw new NotFoundException(`Kelas dengan id ${id} tidak ditemukan`)
    }
    const siswa = await this.siswaRepo.find({
      where: {
        kelas: { id_kelas: id },
      },
    });

    return this._Success('Data kelas Ditemukan', { kelas, siswa })
  }

  async updateKelas(
    id: number,
    updateKelasDto: UpdateKelasDto,
  ): Promise<ResponseSuccess> {
    const check = await this.kelasRepo.findOne({
      where: {
        id_kelas: id,
      },
    });

    if (!check) {
      throw new NotFoundException(`Kelas dengan id ${id} tidak ditemukan`);
    }

    const update = await this.kelasRepo.save({ ...updateKelasDto, id_kelas: id });
    return this._Success('Berhasil mengupdate Kelas!', update)
  }




}
