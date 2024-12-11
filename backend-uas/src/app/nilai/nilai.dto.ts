import { IsNotEmpty, IsEnum, IsNumber, IsInt, IsString, IsOptional } from "class-validator";
import { semester } from "./nilai.entity";
import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateJadwalDto } from "../jadwal/jadwal.dto";
import { PageRequestDto } from "src/utils/dto/page.dto";

export class nilaiDto {
  @IsInt()
  id_nilai: number;
  @IsEnum(semester)
  @IsNotEmpty()
  semester: semester;

  @IsNotEmpty()
  @IsNumber()
  nilai_pengetahuan: number;

  @IsNotEmpty()
  @IsNumber()
  nilai_keterampilan: number;

  @IsNotEmpty()
  id_siswa: number;

  @IsNotEmpty()
  id_mapel: number;
}
export class CreateNilaiDto extends OmitType(nilaiDto, ['id_nilai']) { }
export class UpdateNilaiDto extends PartialType(CreateNilaiDto) { }
export class FindNilaiDto extends PageRequestDto{
  @IsOptional()
  @IsEnum(semester)
  semester?: semester;
  @IsOptional()
  @IsInt()
  nilai_pengetahuan?: number;
  @IsOptional()
  @IsInt()
  nilai_keterampilan?: number;
  @IsString()
  @IsOptional()
  keyword: string;
}