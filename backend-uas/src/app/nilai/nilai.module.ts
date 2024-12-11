import { Module } from '@nestjs/common';
import { NilaiController } from './nilai.controller';
import { NilaiService } from './nilai.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nilai } from './nilai.entity';
import { Siswa } from '../siswa/siswa.entity';
import { Mapel } from '../mapel/mapel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Nilai, Siswa, Mapel
  ])],
  controllers: [NilaiController],
  providers: [NilaiService]
})
export class NilaiModule { }
