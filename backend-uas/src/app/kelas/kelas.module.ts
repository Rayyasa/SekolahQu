import { Module } from '@nestjs/common';
import { KelasController } from './kelas.controller';
import { KelasService } from './kelas.service';
import { Kelas } from './kelas.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Siswa } from '../siswa/siswa.entity';
import { Jadwal } from '../jadwal/jadwal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Kelas, Siswa,Jadwal])],
  controllers: [KelasController],
  providers: [KelasService]
})
export class KelasModule { }
