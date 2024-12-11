import { IsInt, IsNotEmpty, IsOptional, IsString, IsDateString, Matches, IsEnum } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Hari } from './jadwal.entity';
import { PageRequestDto } from 'src/utils/dto/page.dto';

export class JadwalDto {
  @IsInt()
  id_jadwal: number;

  @IsInt()
  @IsNotEmpty()
  id_kelas: number;

  @IsInt()
  @IsNotEmpty()
  id_mapel: number;

  // @IsInt()
  // @IsNotEmpty()
  // id_guru: number;

  @IsEnum(Hari)
  @IsNotEmpty()
  hari: Hari;

  @IsNotEmpty()
  @IsString()
  // @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/) // Validates HH:mm:ss format
  jam_mulai: string;

  @IsNotEmpty()
  @IsString()
  // @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/) // Validates HH:mm:ss format
  jam_selesai: string;
}

export class CreateJadwalDto extends OmitType(JadwalDto, ['id_jadwal']) { }
export class UpdateJadwalDto extends PartialType(CreateJadwalDto) { }

export class findAllJadwal extends PageRequestDto {
  @IsEnum(Hari)
  @IsOptional()
  hari: string;
  @IsString()
  @IsOptional()
  keyword: string;
  @IsOptional()
  @IsString()
  // @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/) // Validates HH:mm:ss format
  dari_jam: string;

  @IsOptional()
  @IsString()
  // @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/) // Validates HH:mm:ss format
  sampai_jam: string;
}
