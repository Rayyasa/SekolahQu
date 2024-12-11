import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { NilaiService } from './nilai.service';
import { CreateNilaiDto, FindNilaiDto, UpdateNilaiDto } from './nilai.dto';
import { ResponseSuccess } from 'src/interface/response.interface';
import { JwtGuard } from '../auth/auth.guard';
import { Pagination } from 'src/utils/decorator/pagination.decorator';
import { Role } from '../auth/auth.entity';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
@UseGuards(JwtGuard)
@Controller('nilai')
export class NilaiController {
  constructor(private readonly nilaiService: NilaiService) { }

  @Get("/list")
  findAllJadwal(@Pagination() query: FindNilaiDto) {
    return this.nilaiService.getAllNilai(query);
  }

  @Get('/detail/:id')
  findOneNilai(@Param('id', ParseIntPipe) id: number) {
    return this.nilaiService.getDetail(id);
  }
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN,Role.GURU)
  @Post('/create')
  createNilai(@Body() createNilaiDto: CreateNilaiDto) {
    return this.nilaiService.create(createNilaiDto);
  }
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN,Role.GURU)
  @Put('/update/:id')
  updateNilai(@Param('id') id: number, @Body() updateNilaiDto: UpdateNilaiDto) {
    return this.nilaiService.updateNilai(id, updateNilaiDto);
  }
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN,Role.GURU)
  @Delete('/delete/:id')
  deleteNilai(@Param('id') id: number) {
    return this.nilaiService.deleteNilai(id);
  }
}
