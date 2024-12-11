import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ResponsePagination, ResponseSuccess } from 'src/interface/response.interface';
import BaseResponse from 'src/utils/response/base.response';
import { Mapel } from './mapel.entity';
import { Guru } from '../guru/guru.entity';
import { CreateMapelDto, UpdateMapelDto, findAllMapel } from './mapel.dto';
@Injectable()
export class MapelService extends BaseResponse {
  constructor(
    @InjectRepository(Mapel)
    private mapelRepository: Repository<Mapel>,
    @InjectRepository(Guru)
    private guruRepository: Repository<Guru>,
  ) {
    super();
  }

  async findOne(id: number): Promise<ResponseSuccess> {
    const mapel = await this.mapelRepository.findOne({ where: { id_mapel: id }, relations: ['guru'] });
    if (!mapel) {
      throw new NotFoundException(`Mapel dengan ID ${id} tidak ditemukan`);
    }
    return this._Success('Sukses Menenemukan Data', mapel);
  }
  async getAllMapel(query: findAllMapel): Promise<ResponsePagination> {
    const { page, pageSize, limit, keyword, nama_mapel,  } = query;

    const filterQuery: { [key: string]: any } = {};
    const filterKeyword = [];

    if (keyword) {
      filterKeyword.push(
        {
          nama_mapel: Like(`%${keyword}%`),
        },

      )

    } else {
      if (nama_mapel) {
        filterQuery.nama_mapel = Like(`%${nama_mapel}%`);
      }
    }
    const total = await this.mapelRepository.count({
      where: filterQuery,
    });
    const result = await this.mapelRepository.find({
      where: keyword ? filterKeyword : filterQuery,
      relations: ['guru'],
      skip: limit,
      take: pageSize,
    });

    return this._Pagination('OK', result, total, page, pageSize);
  }



  async createMapel(createMapelDto: CreateMapelDto): Promise<ResponseSuccess> {
    const { nama_mapel, id_guru } = createMapelDto;

    const guru = await this.guruRepository.findOne({ where: { id_guru } });
    if (!guru) {
      throw new HttpException(`Guru dengan ID ${id_guru} tidak ditemukan`, HttpStatus.NOT_FOUND);
    }
    const mapel = new Mapel();
    mapel.nama_mapel = nama_mapel;// Set nama_pengajar from guru's name
    mapel.guru = guru

    await this.mapelRepository.save(mapel);
    return this._Success('Berhasil Menambahkan Mapel', mapel);

  }

  async updateMapel(id: number, updateMapelDto: UpdateMapelDto): Promise<ResponseSuccess> {
    const { nama_mapel, id_guru } = updateMapelDto;

    const mapel = await this.mapelRepository.findOne({ where: { id_mapel: id }, relations: ['guru'] });
    if (!mapel) {
      throw new NotFoundException(`Mapel dengan ID ${id} tidak ditemukan`);
    }

    if (id_guru) {
      const guru = await this.guruRepository.findOne({ where: { id_guru: id_guru } });
      if (!guru) {
        throw new HttpException(`Guru dengan ID ${id_guru} tidak ditemukan`, HttpStatus.NOT_FOUND);
      }
      mapel.guru = guru;// Update nama_pengajar

    }

    if (nama_mapel) {
      mapel.nama_mapel = nama_mapel;
    }

    await this.mapelRepository.save(mapel);
    return this._Success('Berhasil Memperbarui Mapel', mapel);
  }
  async remove(id: number): Promise<ResponseSuccess> {
    const deleteResult = await this.mapelRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Mapel dengan ID ${id} tidak ditemukan`);
    }
    return this._Success('Berhasil Menghapus Mapel');
  }
}
