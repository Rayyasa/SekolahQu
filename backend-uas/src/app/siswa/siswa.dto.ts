import { OmitType, PartialType, PickType } from "@nestjs/mapped-types";
import { IsArray, IsDateString, IsEmail, IsEnum, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Length, MinLength, ValidateNested, minLength } from "class-validator"
import { Jurusan } from "../kelas/kelas.entity";
import { Siswa, jenis_kelamin } from "./siswa.entity";
import { PageRequestDto } from "src/utils/dto/page.dto";
import { Type } from "class-transformer";

export class SiswaDto {
  @IsInt()
  id_siswa: number;

  @IsString()
  @IsNotEmpty()
  nisn: string;

  @IsString()
  @IsNotEmpty()
  nama_siswa: string;

  @IsString()
  @IsOptional()
  photo?: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(jenis_kelamin)
  @IsIn([jenis_kelamin.L, jenis_kelamin.P])
  jenis_kelamin: jenis_kelamin;

  @IsString()
  @IsNotEmpty()
  tempat_lahir: string;

  @IsDateString()
  @IsNotEmpty()
  tanggal_lahir: string;

  @IsString()
  @IsNotEmpty()
  alamat: string;

  @IsInt()
  @IsNotEmpty()
  id_kelas: number;
}

export class CreateSiswaDto extends OmitType(SiswaDto, [
  "id_siswa"
])
{ }
export class UpdateSiswaDto extends PickType(SiswaDto, [
  "id_siswa",
  "alamat",
  "id_kelas",
  "jenis_kelamin",
  "nisn",
  "nama_siswa",
  "photo",
  "tanggal_lahir",
  "tempat_lahir"
]) { }
export class CreateBulkSiswaDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSiswaDto)
  data: CreateSiswaDto[];
}

export class findAllSiswa extends PageRequestDto {
  @IsString()
  @IsOptional()
  nama_siswa: string;
  @IsString()
  @IsOptional()
  jurusan: string;
  @IsString()
  @IsOptional()
  jenis_kelamin: string;
  @IsString()
  @IsOptional()
  tempat_lahir: string;
  @IsString()
  @IsOptional()
  tanggal_lahir: string;
  @IsString()
  @IsOptional()
  alamat: string;
  @IsInt()
  @IsOptional()
  id_kelas: number;
  @IsString()
  @IsOptional()
  keyword: string;
}