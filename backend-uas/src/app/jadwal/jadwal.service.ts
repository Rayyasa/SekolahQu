import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Like, Repository } from 'typeorm';
import { Jadwal } from './jadwal.entity';
import { CreateJadwalDto, UpdateJadwalDto, findAllJadwal } from './jadwal.dto';
import { Kelas } from '../kelas/kelas.entity';
import { Mapel } from '../mapel/mapel.entity';
import { Guru } from '../guru/guru.entity';
import { ResponsePagination, ResponseSuccess } from 'src/interface/response.interface';
import BaseResponse from 'src/utils/response/base.response';
import { findAllGuru } from '../guru/guru.dto';

@Injectable()
export class JadwalService extends BaseResponse {
  constructor(
    @InjectRepository(Jadwal)
    private jadwalRepository: Repository<Jadwal>,
    @InjectRepository(Kelas)
    private kelasRepository: Repository<Kelas>,
    @InjectRepository(Mapel)
    private mapelRepository: Repository<Mapel>,
    @InjectRepository(Guru)
    private guruRepository: Repository<Guru>,
  ) {
    super();
  }

  async getAllJadwal(query: findAllJadwal): Promise<ResponsePagination> {
    const { page, pageSize, keyword, dari_jam, sampai_jam, limit,hari } = query;

    const filterQuery: { [key: string]: any } = {};
    const filterKeyword = [];

    if (keyword) {
      filterKeyword.push(
        { hari: Like(`%${keyword}%`) },
        { dari_jam: Like(`%${keyword}%`) },
        { sampai_jam: Like(`%${keyword}%`) },
        { kelas: { nama: Like(`%${keyword}%`) } },
        { mapel: { nama: Like(`%${keyword}%`) } },
        { mapel: { guru: { nama: Like(`%${keyword}%`) } } },
      );
    } else {
      if (dari_jam && sampai_jam) {
        filterQuery.jam_mulai = Between(dari_jam, sampai_jam);
        filterQuery.jam_selesai = Between(dari_jam, sampai_jam);
      }
      if(hari) {
        filterQuery.hari = Like(`%${hari}%`);
      }
    }

    const total = await this.jadwalRepository.count({
      where: keyword ? filterKeyword : filterQuery,
      relations: ['kelas', 'mapel', 'mapel.guru'],
    });

    const result = await this.jadwalRepository.find({
      where: keyword ? filterKeyword : filterQuery,
      relations: ['kelas', 'mapel', 'mapel.guru'],
      skip: limit,
      take: pageSize,
    });

    return this._Pagination('OK', result, total, page, pageSize);
  }

  async findOne(id: number): Promise<ResponseSuccess> {
    const jadwal = await this.jadwalRepository.findOne({ where: { id_jadwal: id }, relations: ['kelas', 'mapel', 'guru'] });
    if (!jadwal) {
      throw new NotFoundException(`Jadwal dengan id ${id} tidak ditemukan`);
    }
    return this._Success('Berhasil mendapatkan data Jadwal', jadwal);
  }

  async create(createJadwalDto: CreateJadwalDto): Promise<ResponseSuccess> {
    const { id_kelas, id_mapel, hari, jam_mulai, jam_selesai } = createJadwalDto;

    const kelas = await this.kelasRepository.findOne({
      where: {
        id_kelas
      }
    });
    if (!kelas) {
      throw new NotFoundException(`Kelas dengan id ${id_kelas} tidak ditemukan`);
    }

    const mapel = await this.mapelRepository.findOne({
      where: {
        id_mapel
      },
      relations: ['guru']
    });
    if (!mapel) {
      throw new NotFoundException(`Mapel dengan id ${id_mapel} tidak ditemukan`);
    }

    const jadwal = new Jadwal();
    jadwal.kelas = kelas;
    jadwal.mapel = mapel;
    jadwal.hari = hari;
    jadwal.jam_mulai = jam_mulai;
    jadwal.jam_selesai = jam_selesai;

    await this.jadwalRepository.save(jadwal);
    return this._Success('Berhasil Membuat Jadwal', jadwal);
  }

  async update(id: number, updateJadwalDto: UpdateJadwalDto): Promise<ResponseSuccess> {
    const jadwal = await this.jadwalRepository.findOne({
      where: {
        id_jadwal: id
      }
    });
    if (!jadwal) {
      throw new NotFoundException(`Jadwal dengan id ${id} tidak ditemukan`);
    }

    const { id_kelas, id_mapel, hari, jam_mulai, jam_selesai } = updateJadwalDto;

    if (id_kelas) {
      const kelas = await this.kelasRepository.findOne({
        where: {
          id_kelas
        }
      });
      if (!kelas) {
        throw new NotFoundException(`Kelas dengan id ${id_kelas} tidak ditemukan`);
      }
      jadwal.kelas = kelas;
    }

    if (id_mapel) {
      const mapel = await this.mapelRepository.findOne({
        where: {
          id_mapel
        },
        relations: ['guru']
      });
      if (!mapel) {
        throw new NotFoundException(`Mapel dengan id ${id_mapel} tidak ditemukan`);
      }
      jadwal.mapel = mapel;
    }


    if (hari) {
      jadwal.hari = hari;
    }
    if (jam_mulai) {
      jadwal.jam_mulai = jam_mulai;
    }
    if (jam_selesai) {
      jadwal.jam_selesai = jam_selesai;
    }

    await this.jadwalRepository.save(jadwal);
    return this._Success('Berhasil mengupdate Jadwal', jadwal);
  }


  async remove(id: number): Promise<ResponseSuccess> {
    const result = await this.jadwalRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Jadwal dengan id ${id} tidak ditemukan`);
    }
    return this._Success('Berhasil menghapus jadwal');
  }
}
