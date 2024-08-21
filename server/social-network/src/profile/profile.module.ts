import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { StorageModule } from '../storage/storage.module';
import { SearchModule } from '../search/search.module';

@Module({
  imports: [
  TypeOrmModule.forFeature([Profile]),
    StorageModule,
    SearchModule,
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [TypeOrmModule],
})
export class ProfileModule {}
