import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { GuruService } from './guru.service';
import { JwtGuard } from '../auth/auth.guard';
import { FindBookDto } from 'src/book/book.dto';
import { Pagination } from 'src/utils/decorator/pagination.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { Role } from '../auth/auth.entity';
import { CreateGuruDto, UpdateGuruDto, findAllGuru } from './guru.dto';
@UseGuards(JwtGuard)

@Controller('guru')
export class GuruController {
  constructor(private readonly guruService: GuruService) { }

  @Get("/list")
  findAllGuru(@Pagination() query: findAllGuru) {
    return this.guruService.getAllGuru(query);
  }
  @Get('detail/:id')
  findOneGuru(@Param('id') id: string) {
    return this.guruService.findById(Number(id));
  }
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Post('/create')
  createKelas(@Body() payload: CreateGuruDto) {
    return this.guruService.createGuru(payload);
  }
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.guruService.delete(Number(id));
  }
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Put('/update/:id')
  update(@Param('id') id: string, @Body() updateGuruDto: UpdateGuruDto) {
    return this.guruService.update(Number(id), updateGuruDto);
  }


}
