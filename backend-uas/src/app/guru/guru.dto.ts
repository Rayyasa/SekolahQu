import { OmitType, PartialType, PickType } from "@nestjs/mapped-types";
import { IsEmail, IsEnum, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Length, MinLength, minLength } from "class-validator";
import { JenisKelamin } from "./guru.entity";
import { PageRequestDto } from "src/utils/dto/page.dto";


export class GuruDto {
  @IsInt()
  id_guru: number;

  @IsString()
  @IsNotEmpty()
  nama_guru: string
  @IsString()
  @IsNotEmpty()
  nip: string

  @IsString()
  @IsOptional()
  photo?: string

  @IsNotEmpty()
  @IsEnum(JenisKelamin)
  @IsIn([JenisKelamin.L, JenisKelamin.P])
  jenisKelamin: JenisKelamin;

  @IsString()
  @IsNotEmpty()
  alamat: string

  @IsString()
  @IsNotEmpty()
  noTelp: string

}

export class CreateGuruDto extends OmitType(GuruDto, [
  "id_guru"
]) { }
export class UpdateGuruDto extends PartialType(CreateGuruDto) { }
export class findAllGuru extends PageRequestDto {
  @IsString()
  @IsOptional()
  nama_guru: string;
  @IsString()
  @IsOptional()
  jenisKelamin: string;
  @IsString()
  @IsOptional()
  alamat: string;
  @IsString()
  @IsOptional()
  noTelp: string;
  @IsString()
  @IsOptional()
  nip: string;
  @IsString()
  @IsOptional()
  keyword: string;
}