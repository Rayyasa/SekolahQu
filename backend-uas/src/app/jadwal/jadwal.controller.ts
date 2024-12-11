import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { JadwalService } from './jadwal.service';
import { CreateJadwalDto, UpdateJadwalDto, findAllJadwal } from './jadwal.dto';
import { ResponseSuccess } from 'src/interface/response.interface';
import { JwtGuard } from '../auth/auth.guard';
import { Pagination } from 'src/utils/decorator/pagination.decorator';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { Role } from '../auth/auth.entity';
import { RolesGuard } from '../auth/roles.guard';
@UseGuards(JwtGuard)
@Controller('jadwal')
export class JadwalController {
  constructor(private readonly jadwalService: JadwalService) { }

  @Get("/list")
  findAllJadwal(@Pagination() query: findAllJadwal) {
    return this.jadwalService.getAllJadwal(query);
  }

  @Get('/detail/:id')
  findOne(@Param('id') id: number) {
    return this.jadwalService.findOne(id);
  }
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Post('/create')
  create(@Body() createJadwalDto: CreateJadwalDto) {
    return this.jadwalService.create(createJadwalDto);
  }
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Put('/update/:id')
  update(@Param('id') id: number, @Body() updateJadwalDto: UpdateJadwalDto) {
    return this.jadwalService.update(id, updateJadwalDto);
  }
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Delete('/delete/:id')
  remove(@Param('id') id: number) {
    return this.jadwalService.remove(id);
  }
}
