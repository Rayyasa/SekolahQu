import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { WaliMuridService } from './wali-murid.service';
import { CreateBulkWaliMuridDto, CreateWaliMuridDto, FindAllWaliMuridDto, UpdateWaliMuridDto } from './wali-murid.dto';
import { ResponseSuccess } from 'src/interface/response.interface';
import { JwtGuard } from '../auth/auth.guard';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { Role } from '../auth/auth.entity';
import { RolesGuard } from '../auth/roles.guard';
@UseGuards(JwtGuard)
@Controller('waliMurid')
export class WaliMuridController {
  constructor(private readonly waliMuridService: WaliMuridService) { }

  @Get('/list')
  async findAll(@Query() query: FindAllWaliMuridDto) {
    return this.waliMuridService.findAll(query);
  }

  @Get('/detail/:id')
  findOne(@Param('id') id: string) {
    return this.waliMuridService.findOne(+id);
  }
  // @UseGuards(RolesGuard)
  // @Roles(Role.ADMIN)
  @Post('/create')
  create(@Body() createWaliMuridDto: CreateWaliMuridDto) {
    return this.waliMuridService.create(createWaliMuridDto);
  }
  // @UseGuards(RolesGuard)
  // @Roles(Role.ADMIN)
  @Put('/update/:id')
  update(@Param('id') id: string, @Body() updateWaliMuridDto: UpdateWaliMuridDto) {
    return this.waliMuridService.update(+id, updateWaliMuridDto);
  }
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.waliMuridService.remove(+id);
  }
  // @Post('/create-bulk')
  // async createBulk(@Body() createBulkWaliMuridDto: CreateBulkWaliMuridDto) {
  //   return this.waliMuridService.bulkCreate(createBulkWaliMuridDto);
  // }
}
