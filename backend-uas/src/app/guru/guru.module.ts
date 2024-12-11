import { Module } from '@nestjs/common';
import { GuruController } from './guru.controller';
import { GuruService } from './guru.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guru } from './guru.entity';
import { Mapel } from '../mapel/mapel.entity';
import { Jadwal } from '../jadwal/jadwal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Guru, Mapel,Jadwal])],
  controllers: [GuruController],
  providers: [GuruService]
})
export class GuruModule { }
