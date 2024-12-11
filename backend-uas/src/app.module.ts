import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LatihanModule } from './latihan/latihan.module';
import { BookModule } from './book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './app/auth/auth.module';
import { MailModule } from './app/mail/mail.module';
import { UploadController } from './app/upload/upload.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UniqueValidator } from './utils/validator/unique.validator';
import { KelasModule } from './app/kelas/kelas.module';
import { SiswaModule } from './app/siswa/siswa.module';
import { GuruModule } from './app/guru/guru.module';
import { MapelModule } from './app/mapel/mapel.module';
import { JadwalModule } from './app/jadwal/jadwal.module';
import { NilaiModule } from './app/nilai/nilai.module';
import { AbsensiModule } from './app/absensi/absensi.module';
import { WaliMuridModule } from './app/wali-murid/wali-murid.module';
import { ProfileModule } from './app/profile/profile.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public'),
  }), ConfigModule.forRoot({
    isGlobal: true,  // konfigurasi is global untuk semua module
  }), TypeOrmModule.forRoot(typeOrmConfig), LatihanModule, BookModule, AuthModule, MailModule, KelasModule, SiswaModule, GuruModule, MapelModule, JadwalModule, NilaiModule, AbsensiModule, WaliMuridModule, ProfileModule,],
  controllers: [AppController, UploadController],
  providers: [AppService, UniqueValidator],
})
export class AppModule { }
