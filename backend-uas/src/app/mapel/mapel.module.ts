import { Module } from '@nestjs/common';
import { MapelController } from './mapel.controller';
import { MapelService } from './mapel.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guru } from '../guru/guru.entity';
import { Mapel } from './mapel.entity';
import { Jadwal } from '../jadwal/jadwal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mapel, Guru,Jadwal])],
  controllers: [MapelController],
  providers: [MapelService]
})
export class MapelModule { }
