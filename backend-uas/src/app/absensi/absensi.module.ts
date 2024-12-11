import { Module } from '@nestjs/common';
import { AbsensiController } from './absensi.controller';
import { AbsensiService } from './absensi.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Absensi } from './absensi.entity';
import { Siswa } from '../siswa/siswa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Absensi,Siswa
  ])],
  controllers: [AbsensiController],
  providers: [AbsensiService]
})
export class AbsensiModule {}
