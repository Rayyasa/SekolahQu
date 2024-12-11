import { Module } from '@nestjs/common';
import { WaliMuridController } from './wali-murid.controller';
import { WaliMuridService } from './wali-murid.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaliMurid } from './wali-murid.entity';
import { Siswa } from '../siswa/siswa.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WaliMurid, Siswa
    ])
  ],
  controllers: [WaliMuridController],
  providers: [WaliMuridService]
})
export class WaliMuridModule { }
