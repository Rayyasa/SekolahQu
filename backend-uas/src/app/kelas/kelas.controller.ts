import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { KelasService } from './kelas.service';
import { CreateKelasDto, UpdateKelasDto, findKelas } from './kelas.dto';
import { JwtGuard } from '../auth/auth.guard';
import { FindBookDto } from 'src/book/book.dto';
import { Pagination } from 'src/utils/decorator/pagination.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { Role } from '../auth/auth.entity';

@UseGuards(JwtGuard)
@Controller('kelas')
export class KelasController {
  constructor(private readonly kelasService: KelasService) { }

  @Get("/list")
  findAllKelas(@Pagination() query: findKelas) {
    return this.kelasService.getAllKelas(query);
  }
  @Get('detail/:id')
  findOneBook(@Param('id') id: string) {
    return this.kelasService.getDetail(Number(id));
  }
  // @UseGuards(RolesGuard)
  // @Roles(Role.ADMIN)
  @Post('/create')
  createKelas(@Body() payload: CreateKelasDto) {
    return this.kelasService.createKelas(payload);
  }
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.kelasService.remove(id);
  }
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Put('/update/:id')
  update(@Param('id') id: string, @Body() updateKelasDto: UpdateKelasDto) {
    return this.kelasService.updateKelas(Number(id), updateKelasDto);
  }
}
