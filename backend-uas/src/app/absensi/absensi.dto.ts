import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { status } from './absensi.entity';
import { PageRequestDto } from 'src/utils/dto/page.dto';

export class AbsensiDto {
  @IsInt()
  id_absensi: number;

  @IsDateString()
  @IsNotEmpty()
  tanggal: string;

  @IsEnum(status)
  @IsNotEmpty()
  status: status;

  @IsInt()
  @IsNotEmpty()
  id_siswa: number;
}

export class CreateAbsensiDto extends OmitType(AbsensiDto, ['id_absensi']) { }

export class UpdateAbsensiDto extends PartialType(CreateAbsensiDto) { }

export class FindAllAbsensiDto extends PageRequestDto{
  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsDateString()
  tanggal?: string;

  @IsOptional()
  @IsEnum(status)
  status?: status;
}
