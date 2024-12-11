import { OmitType, PartialType, PickType } from "@nestjs/mapped-types";
import { IsEmail, IsEnum, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Length, MinLength, minLength } from "class-validator";
import { Jurusan, Kelas, NamaKelas } from "./kelas.entity";
import { PageRequestDto } from "src/utils/dto/page.dto";

export class KelasDto {
  @IsInt()
  id_kelas: number;

  @IsString()
  @IsNotEmpty()
  @IsEnum(NamaKelas)
  @IsIn([NamaKelas.X, NamaKelas.XI,NamaKelas.XII])
  nama_kelas: NamaKelas;

  @IsString()
  @IsNotEmpty()
  @IsEnum(Jurusan)
  @IsIn([Jurusan.RPL, Jurusan.TKJ])
  Jurusan: Jurusan;
}

export class CreateKelasDto extends OmitType(KelasDto, [
  "id_kelas"
])
{ }
export class UpdateKelasDto extends OmitType(KelasDto, [
])
{ }

export class findKelas extends PageRequestDto {
  @IsEnum(NamaKelas)
  @IsOptional()
  nama_kelas: string;
  @IsString()
  @IsOptional()
  Jurusan: string;
  @IsString()
  @IsOptional()
  keyword: string;
}

