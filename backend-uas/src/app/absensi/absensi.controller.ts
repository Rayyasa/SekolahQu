import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Put } from '@nestjs/common';
import { AbsensiService } from './absensi.service';
import { CreateAbsensiDto, UpdateAbsensiDto, FindAllAbsensiDto } from './absensi.dto';
import { ResponsePagination, ResponseSuccess } from 'src/interface/response.interface';
import { JwtGuard } from '../auth/auth.guard';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { Role } from '../auth/auth.entity';
import { RolesGuard } from '../auth/roles.guard';


@UseGuards(JwtGuard)
@Controller('absensi')
export class AbsensiController {
  constructor(private readonly absensiService: AbsensiService) {}

  @Get('/list')
  async findAll(@Query() query: FindAllAbsensiDto) {
    return this.absensiService.findAll(query);
  }

  @Get('/detail/:id')
  async findOne(@Param('id') id: string) {
    return this.absensiService.findOne(+id);
  }
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN,Role.GURU)
  @Post('/create')
  async create(@Body() createAbsensiDto: CreateAbsensiDto) {
    return this.absensiService.create(createAbsensiDto);
  }
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN,Role.GURU)
  @Put('/update/:id')
  async update(@Param('id') id: string, @Body() updateAbsensiDto: UpdateAbsensiDto) {
    return this.absensiService.update(+id, updateAbsensiDto);
  }
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Delete('/delete/:id')
  async remove(@Param('id') id: string) {
    return this.absensiService.remove(+id);
  }
}
