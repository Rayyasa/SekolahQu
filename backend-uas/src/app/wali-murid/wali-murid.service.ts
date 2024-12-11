import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { WaliMurid } from './wali-murid.entity';
import { Siswa } from '../siswa/siswa.entity';
import { CreateBulkWaliMuridDto, CreateWaliMuridDto, FindAllWaliMuridDto, UpdateWaliMuridDto } from './wali-murid.dto';
import { ResponsePagination, ResponseSuccess } from 'src/interface/response.interface';
import BaseResponse from 'src/utils/response/base.response';

@Injectable()
export class WaliMuridService extends BaseResponse {
  constructor(
    @InjectRepository(WaliMurid)
    private readonly waliMuridRepository: Repository<WaliMurid>,
    @InjectRepository(Siswa)
    private readonly siswaRepository: Repository<Siswa>,
  ) {
    super();
  }

  async findAll(query: FindAllWaliMuridDto): Promise<ResponsePagination> {
    const { page, pageSize, keyword, limit, nama, alamat, noTelp, sort_by, order_by } = query;
    const filterQuery: { [key: string]: any } = {};
    const filterKeyword = [];

    if (keyword) {
      filterKeyword.push(
        { nama: Like(`%${keyword}%`) },
        { alamat: Like(`%${keyword}%`) },
        { noTelp: Like(`%${keyword}%`) },
        { siswa: { nama: Like(`%${keyword}%`) } },
      );
    } else {
      if (nama) {
        filterQuery.nama = nama;
      }
      if (alamat) {
        filterQuery.alamat = alamat;
      }
      if (noTelp) {
        filterQuery.noTelp = noTelp;
      }
    }

    const total = await this.waliMuridRepository.count({
      where: keyword ? filterKeyword : filterQuery,
    });

    const result = await this.waliMuridRepository.find({
      where: keyword ? filterKeyword : filterQuery,
      skip: limit,
      take: pageSize,
      order: {
        [sort_by]: order_by,
      }
    });

    return this._Pagination('OK', result, total, page, pageSize);

  }

  async findOne(id: number): Promise<ResponseSuccess> {
    const waliMurid = await this.waliMuridRepository.findOne({ where: { id_wali_murid: id }, relations: ['siswa'] });
    if (!waliMurid) {
      throw new NotFoundException(`Wali Murid dengan ID ${id} tidak ditemukan`);
    }
    return this._Success('Berhasil mendapatkan data Wali Murid', waliMurid);
  }
  async create(createWaliMuridDto: CreateWaliMuridDto): Promise<ResponseSuccess> {
    const { nama, alamat, no_telp, id_siswa } = createWaliMuridDto;

    // Cari data siswa
    const siswa = await this.siswaRepository.findByIds(id_siswa);
    if (siswa.length !== id_siswa.length) {
      throw new NotFoundException('Beberapa siswa tidak ditemukan');
    }

    // Membuat wali murid untuk setiap siswa
    const savedWaliMurids = [];
    for (const siswaItem of siswa) {
      const waliMurid = new WaliMurid();
      waliMurid.nama = nama;
      waliMurid.alamat = alamat;
      waliMurid.no_telp = no_telp;
      waliMurid.siswa = siswaItem;

      // Menyimpan entitas Wali Murid
      const savedWaliMurid = await this.waliMuridRepository.save(waliMurid);
      savedWaliMurids.push(savedWaliMurid);
    }
    return this._Success('Berhasil menambahkan Wali Murid', savedWaliMurids);

  }
  async update(id: number, updateWaliMuridDto: UpdateWaliMuridDto): Promise<ResponseSuccess> {
    const { nama, alamat, no_telp, id_siswa } = updateWaliMuridDto;

    // Cari data Wali Murid
    const waliMurid = await this.waliMuridRepository.findOne({ where: { id_wali_murid: id }, relations: ['siswa'] });
    if (!waliMurid) {
      throw new NotFoundException(`Wali Murid dengan ID ${id} tidak ditemukan`);
    }

    // Mencari semua siswa berdasarkan ID yang diberikan
    const siswa = await this.siswaRepository.findByIds(id_siswa);

    // Memastikan semua siswa ditemukan
    if (siswa.length !== id_siswa.length) {
      throw new NotFoundException('Beberapa siswa tidak ditemukan');
    }

    // Memperbarui data Wali Murid
    waliMurid.nama = nama;
    waliMurid.alamat = alamat;
    waliMurid.no_telp = no_telp;

    // Simpan perubahan data Wali Murid
    await this.waliMuridRepository.save(waliMurid);

    return this._Success('Berhasil memperbarui Wali Murid', waliMurid);
  }



  async remove(id: number): Promise<ResponseSuccess> {
    const result = await this.waliMuridRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Wali Murid dengan ID ${id} tidak ditemukan`);
    }
    return this._Success('Berhasil menghapus Wali Murid');
  }
  // async bulkCreate(payload: CreateBulkWaliMuridDto): Promise<ResponseSuccess> {
  //   try {
  //     let berhasil = 0;
  //     let gagal = 0;
  //     await Promise.all(
  //       payload.data.map(async (item: CreateWaliMuridDto) => {
  //         try {
  //           const siswa = await this.siswaRepository.findOne({
  //             where: {
  //               id_siswa: item.id_siswa
  //             }
  //           });
  //           if (!siswa) {
  //             gagal += 1;
  //             return;
  //           }
  //           const waliMurid = this.waliMuridRepository.create({
  //             ...item,
  //             siswa
  //           });
  //           await this.waliMuridRepository.save(waliMurid);
  //           berhasil += 1;
  //         } catch (error) {
  //           gagal += 1;
  //         }
  //       })
  //     );
  //     return this._Success(`Berhasil menambahkan wali murid sebanyak ${berhasil} dan gagal sebanyak ${gagal}`, payload);
  //   } catch (error) {
  //     throw new HttpException('ada kesalahan', HttpStatus.BAD_REQUEST);
  //   }
  // }
}
