import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsOptional, IsInt, IsArray, ValidateNested } from 'class-validator';
import { AbsensiDto } from '../absensi/absensi.dto';
import { PageRequestDto } from 'src/utils/dto/page.dto';
import { Type } from 'class-transformer';

export class waliMuridDto {
  @IsInt()
  id_wali_murid: number;

  @IsString()
  @IsNotEmpty()
  nama: string;

  @IsString()
  @IsNotEmpty()
  alamat: string;

  @IsString()
  @IsNotEmpty()
  no_telp: string;

  @IsArray()
  @IsInt({ each: true })
  id_siswa: number[];
}

export class CreateWaliMuridDto extends OmitType(waliMuridDto, ['id_wali_murid']) { }

export class UpdateWaliMuridDto extends PartialType(CreateWaliMuridDto) { }


export class FindAllWaliMuridDto extends PageRequestDto {
  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsString()
  nama?: string;

  @IsOptional()
  @IsString()
  noTelp?: string;
  @IsOptional()
  @IsString()
  alamat?: string;
}
export class CreateBulkWaliMuridDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWaliMuridDto)
  data: CreateWaliMuridDto[];
}