import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user } from '../auth/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([user])],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule { }
