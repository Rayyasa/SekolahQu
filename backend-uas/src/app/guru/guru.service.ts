import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Guru } from './guru.entity';
import { CreateGuruDto, UpdateGuruDto, findAllGuru } from './guru.dto';
import { ResponsePagination, ResponseSuccess } from 'src/interface';
import BaseResponse from 'src/utils/response/base.response';

@Injectable()
export class GuruService extends BaseResponse {
  constructor(
    @InjectRepository(Guru)
    private guruRepository: Repository<Guru>,
  ) {
    super()
  }

  async getAllGuru(query: findAllGuru): Promise<ResponsePagination> {
    const { page, pageSize, limit, nama_guru, alamat, keyword, jenisKelamin, noTelp, nip } = query;

    const filterQuery: { [key: string]: any } = {};
    const filterKeyword = [];

    if (keyword) {
      filterKeyword.push(
        {
          nama_guru: Like(`%${keyword}%`),
        },
        {
          alamat: Like(`%${keyword}%`),
        },
        {
          jenisKelamin: Like(`%${keyword}%`),
        },
        {
          noTelp: Like(`%${keyword}%`),
        },
        {
          nip: Like(`%${keyword}%`),
        },
      )

    } else {
      if (nama_guru) {
        filterQuery.nama_guru = Like(`%${nama_guru}%`);
      }
      if (alamat) {
        filterQuery.alamat = Like(`%${alamat}%`);
      }
      if (jenisKelamin) {
        filterQuery.jenisKelamin = Like(`%${jenisKelamin}%`);
      }
      if (noTelp) {
        filterQuery.noTelp = Like(`%${noTelp}%`);
      }
      if (nip) {
        filterQuery.nip = Like(`%${nip}%`);
      }
    }
    const total = await this.guruRepository.count({
      where: filterQuery,
    });
    const result = await this.guruRepository.find({
      where: keyword ? filterKeyword : filterQuery,
      skip: limit,
      take: pageSize,
    });

    return this._Pagination('OK', result, total, page, pageSize);
  }

  async findById(id: number): Promise<ResponseSuccess> {
    const guru = await this.guruRepository.findOne({
      where: {
        id_guru: id
      }
    });
    if (!guru) {
      throw new NotFoundException('Data Guru tidak ditemukan!');
    }
    return this._Success('Berhasil Menemukan Data Guru!', guru);
  }

  async createGuru(guruDto: CreateGuruDto): Promise<ResponseSuccess> {
    const { nama_guru, jenisKelamin, alamat, noTelp, nip,photo } = guruDto;

    try {
      await this.guruRepository.save({
        nama_guru,
        jenisKelamin,
        alamat,
        noTelp,
        nip,
        photo
      })
      return this._Success('Berhasil Membuat Data Guru!')
    } catch (error) {
      throw new HttpException('Ada kesalahan', HttpStatus.BAD_REQUEST)
    }
  }

  async update(id: number, guruDto: UpdateGuruDto): Promise<ResponseSuccess> {
    const check = await this.guruRepository.findOne({
      where: {
        id_guru: id,
      },
    });

    if (!check) {
      throw new NotFoundException(`Data Guru dengan id ${id} tidak ditemukan`);
    }

    const update = await this.guruRepository.save({ ...guruDto, id_guru: id });
    return this._Success('Berhasil mengupdate Data Guru!', update)
  }

  async delete(id: number): Promise<ResponseSuccess> {
    const result = await this.guruRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Data Guru Tidak ditemukan!');
    }
    return this._Success('Berhasil Menghapus Data Guru!')

  }
}
