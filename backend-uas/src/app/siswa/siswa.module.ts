import { Module } from '@nestjs/common';
import { SiswaController } from './siswa.controller';
import { SiswaService } from './siswa.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kelas } from '../kelas/kelas.entity';
import { Siswa } from './siswa.entity';
import { Absensi } from '../absensi/absensi.entity';
import { WaliMurid } from '../wali-murid/wali-murid.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Kelas, Siswa, Absensi,WaliMurid])],
  controllers: [SiswaController],
  providers: [SiswaService]
})
export class SiswaModule { }
