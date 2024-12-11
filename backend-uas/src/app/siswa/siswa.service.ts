import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Siswa } from './siswa.entity';
import { CreateBulkSiswaDto, CreateSiswaDto, UpdateSiswaDto, findAllSiswa } from './siswa.dto';
import { Kelas } from '../kelas/kelas.entity'; // Import Kelas
import { Jurusan } from '../kelas/kelas.entity'; // Import enum Jurusan
import { ResponsePagination, ResponseSuccess } from 'src/interface/response.interface';
import BaseResponse from 'src/utils/response/base.response';
import { id } from 'date-fns/locale';

@Injectable()
export class SiswaService extends BaseResponse {
  constructor(
    @InjectRepository(Siswa)
    private siswaRepository: Repository<Siswa>,
    @InjectRepository(Kelas) // Inject repository untuk Kelas
    private kelasRepository: Repository<Kelas>,
  ) {
    super()
  }

  async getAllSiswa(query: findAllSiswa): Promise<ResponsePagination> {
    const { page, pageSize, limit, keyword, nama_siswa, alamat, jenis_kelamin, tanggal_lahir, tempat_lahir, sort_by, order_by } = query;

    const filterQuery: { [key: string]: any } = {};
    const filterKeyword = [];

    if (keyword) {
      filterKeyword.push(
        {
          nama_siswa: Like(`%${keyword}%`),
        },
        {
          alamat: Like(`%${keyword}%`),
        },
        {
          jenis_kelamin: Like(`%${keyword}%`),
        },
        {
          tanggal_lahir: Like(`%${keyword}%`),
        },
        {
          tempat_lahir: Like(`%${keyword}%`),
        },
      )

    } else {
      if (nama_siswa) {
        filterQuery.nama_siswa = Like(`%${nama_siswa}%`);
      }
      if (alamat) {
        filterQuery.alamat = Like(`%${alamat}%`);
      }
      if (jenis_kelamin) {
        filterQuery.jenis_kelamin = Like(`%${jenis_kelamin}%`);
      }
      if (tanggal_lahir) {
        filterQuery.tanggal_lahir = Like(`%${tanggal_lahir}%`);
      }
      if (tempat_lahir) {
        filterQuery.tempat_lahir = Like(`%${tempat_lahir}%`);
      }
    }
    const total = await this.siswaRepository.count({
      where: filterQuery,
    });
    const result = await this.siswaRepository.find({
      where: keyword ? filterKeyword : filterQuery,
      relations: ['kelas'],
      skip: limit,
      take: pageSize,
      order: {
        [sort_by]: order_by,
      }
    });

    return this._Pagination('OK', result, total, page, pageSize);
  }
  async findOne(id: number): Promise<ResponseSuccess> {
    const siswa = await this.siswaRepository.findOne({
      where: {
        id_siswa: id
      },
      relations: ['kelas', 'nilai']
    });
    if (!siswa) {
      throw new NotFoundException(`Siswa dengan id ${id} tidak ditemukan`);
    }
    return this._Success('Sukses Menenemukan Data', siswa);
  }

  async createSiswa(createSiswaDto: CreateSiswaDto): Promise<ResponseSuccess> {
    const { nisn, nama_siswa, jenis_kelamin, tempat_lahir, tanggal_lahir, alamat, id_kelas, photo } = createSiswaDto;

    const kelas = await this.kelasRepository.findOne({
      where: {
        id_kelas
      }
    });
    if (!kelas) {
      throw new HttpException(`Kelas dengan id ${id_kelas} tidak ditemukan`, HttpStatus.NOT_FOUND);
    }

    const siswa = new Siswa();
    siswa.nisn = nisn;
    siswa.nama_siswa = nama_siswa;
    siswa.jenis_kelamin = jenis_kelamin;
    siswa.tempat_lahir = tempat_lahir;
    siswa.tanggal_lahir = tanggal_lahir;
    siswa.photo = photo;
    siswa.alamat = alamat;
    siswa.kelas = kelas

    await this.siswaRepository.save(siswa);

    await this.siswaRepository.save(siswa);
    console.log(id_kelas);
    return this._Success('Berhasil Menambahkan Siswa', siswa);
  }

  async updateSiswa(id: number, updateSiswaDto: UpdateSiswaDto): Promise<ResponseSuccess> {


    const siswa = await this.siswaRepository.findOne({
      where: { id_siswa: id },
      relations: ['kelas'],
    });
    if (!siswa) {
      throw new NotFoundException(`Siswa dengan ID ${id} tidak ditemukan`);
    }
    const kelas = await this.kelasRepository.findOne(
      { where: { id_kelas: updateSiswaDto.id_kelas } },
    );
    if (!kelas) {
      throw new NotFoundException(`Kelas dengan ID ${updateSiswaDto.id_kelas} tidak ditemukan`);
    }
    const updatedSiswa = await this.siswaRepository.save({ ...updateSiswaDto, id_siswa: id });
    return this._Success('Berhasil Memperbarui Siswa', updatedSiswa);

    //Jurusan sesuai dengan tabel kelas
  }



  async remove(id: string): Promise<ResponseSuccess> {
    const deleteResult = await this.siswaRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Siswa dengan ID ${id} tidak ditemukan`);
    }
    return this._Success('Berhasil Menghapus Siswa')
  }
  async bulkCreate(payload: CreateBulkSiswaDto): Promise<ResponseSuccess> {
    try {
      let berhasil = 0;
      let gagal = 0;
      await Promise.all(
        payload.data.map(async (item) => {
          try {
            const kelas = await this.kelasRepository.findOne({
              where: {
                id_kelas: item.id_kelas
              }
            });
            if (!kelas) {
              gagal += 1;
              return;
            }

            const siswa = this.siswaRepository.create({
              ...item,
              kelas,
            });

            await this.siswaRepository.save(siswa);
            berhasil += 1;
          } catch {
            gagal += 1;
          }
        })
      );

      return {
        status: 'Ok',
        message: `Berhasil menambahkan siswa sebanyak ${berhasil} dan gagal sebanyak ${gagal}`,
        data: payload
      };
    } catch {
      throw new HttpException('Ada kesalahan', HttpStatus.BAD_REQUEST);
    }
  }
}
