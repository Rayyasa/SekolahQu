import { PartialType, PickType } from "@nestjs/mapped-types";
import { IsEmail, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Length, MinLength, minLength } from "class-validator";
import { Role } from "./auth.entity";
import { PageRequestDto } from "src/utils/dto/page.dto";

export class UsersDto {
  @IsInt()
  id: number;

  @IsString()
  nama: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  avatar: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  refresh_token: string;

  @IsString()
  @IsNotEmpty()
  @IsIn([Role.ADMIN, Role.GURU, Role.SISWA, Role.WALIMURID])
  role: Role;
}
export class RegisterDto extends PickType(UsersDto, [
  "nama",
  "email",
  "password",
  "role"
]) { }

export class LoginDto extends PickType(UsersDto, ['email', 'password']) { }
export class ResetPasswordDto {
  @IsString()
  @MinLength(8)
  new_password: string;
}
export class FindAllUserDto extends PageRequestDto {
  @IsOptional()
  @IsString()
  keyword?: string;
  @IsOptional()
  @IsString()
  nama?: string;
  @IsOptional()
  @IsString()
  email?: string;
}