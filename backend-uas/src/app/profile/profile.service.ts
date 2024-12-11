import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseResponse from 'src/utils/response/base.response';
import { user } from '../auth/auth.entity';
import { ResponseSuccess } from 'src/interface';
import { Repository } from 'typeorm';
import { UpdateProfileDto } from './profile.dto';

@Injectable()
export class ProfileService extends BaseResponse {
  constructor(
    @InjectRepository(user)
    private readonly profileRepository: Repository<user>,
  ) {
    super();
  }

  async updateProfile(
    id: number,
    payload: UpdateProfileDto,
  ): Promise<ResponseSuccess> {
    const update = await this.profileRepository.save({
      nama: payload.nama,
      avatar: payload.avatar,
      id: id,
    });

    return this._Success('Update Success', update);
  }
}