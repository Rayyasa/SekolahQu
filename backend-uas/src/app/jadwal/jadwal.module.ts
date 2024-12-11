import { Module } from '@nestjs/common';
import { JadwalController } from './jadwal.controller';
import { JadwalService } from './jadwal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guru } from '../guru/guru.entity';
import { Kelas } from '../kelas/kelas.entity';
import { Mapel } from '../mapel/mapel.entity';
import { Jadwal } from './jadwal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Jadwal, Kelas, Mapel, Guru])],
  controllers: [JadwalController],
  providers: [JadwalService]
})
export class JadwalModule {}
