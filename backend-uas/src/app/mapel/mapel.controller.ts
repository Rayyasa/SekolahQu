import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { MapelService } from './mapel.service';
import { CreateMapelDto, UpdateMapelDto, findAllMapel } from './mapel.dto';
import { JwtGuard } from '../auth/auth.guard';
import { Pagination } from 'src/utils/decorator/pagination.decorator';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { Role } from '../auth/auth.entity';
import { RolesGuard } from '../auth/roles.guard';

@UseGuards(JwtGuard)
@Controller('mapel')
export class MapelController {
  constructor(private readonly mapelService: MapelService) { }

  @Get('/list')
  async findAll(@Pagination() query: findAllMapel) {
    return await this.mapelService.getAllMapel(query);
  }

  @Get('/detail/:id')
  async findOne(@Param('id') id: number) {
    return await this.mapelService.findOne(id);
  }
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Post('/create')
  async create(@Body() createMapelDto: CreateMapelDto) {
    return await this.mapelService.createMapel(createMapelDto);
  }
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Put('/update/:id')
  async update(@Param('id') id: number, @Body() updateMapelDto: UpdateMapelDto) {
    return await this.mapelService.updateMapel(id, updateMapelDto);
  }
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Delete('/delete/:id')
  async remove(@Param('id') id: number) {
    return await this.mapelService.remove(id);
  }
}