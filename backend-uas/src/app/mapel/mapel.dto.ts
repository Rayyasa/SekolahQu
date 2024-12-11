import { OmitType, PartialType, PickType } from "@nestjs/mapped-types";
import { IsEmail, IsEnum, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Length, MinLength, minLength } from "class-validator";
import { PageRequestDto } from "src/utils/dto/page.dto";
export class MapelDto {
  @IsInt()
  id_mapel: number;

  @IsString()
  @IsNotEmpty()
  nama_mapel: string;

  @IsInt()
  @IsNotEmpty()
  id_guru: number;
}

export class CreateMapelDto extends OmitType(MapelDto, [
  "id_mapel",
]) { }
export class UpdateMapelDto extends PartialType(CreateMapelDto) { }


export class findAllMapel extends PageRequestDto {
  @IsString()
  @IsOptional()
  nama_mapel: string;
  @IsString()
  @IsOptional()
  nama_pengajar: string;
  @IsString()
  @IsOptional()
  keyword: string;
}