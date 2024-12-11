import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateBulkSiswaDto, CreateSiswaDto, UpdateSiswaDto, findAllSiswa } from './siswa.dto';
import { JwtGuard } from '../auth/auth.guard';
import { FindBookDto } from 'src/book/book.dto';
import { Pagination } from 'src/utils/decorator/pagination.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { Role } from '../auth/auth.entity';
import { SiswaService } from './siswa.service';

@UseGuards(JwtGuard)
@Controller('siswa')
export class SiswaController {
  constructor(private readonly siswaService: SiswaService) { }


  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Post('/create')
  createSiswa(@Body() payload: CreateSiswaDto) {
    return this.siswaService.createSiswa(payload)
  }
  @Get("/list")
  findAllSiswa(@Pagination() query: findAllSiswa) {
    return this.siswaService.getAllSiswa(query);
  }
  @Get('detail/:id')
  getDetailSiswa(@Param('id') id: string) {
    return this.siswaService.findOne(Number(id));
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.siswaService.remove(id);
  }
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Put('/update/:id')
  async updateSiswa(
    @Param('id') id: number,
    @Body() updateSiswaDto: UpdateSiswaDto,
  ) {
    return this.siswaService.updateSiswa(id, updateSiswaDto)
  }

  @Post('/create-bulk')
  async createBulk(@Body() createBulkSiswaDto: CreateBulkSiswaDto) {
    return this.siswaService.bulkCreate(createBulkSiswaDto);
  }
}
