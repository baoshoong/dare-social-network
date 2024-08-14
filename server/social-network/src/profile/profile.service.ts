import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,

  ) {}

  async createProfile(createProfileDto: CreateProfileDto, uid: string): Promise<Profile> {
    // Kiểm tra xem profile đã tồn tại chưa
    const existingProfile = await this.profileRepository.findOne({ where: { uid } });
    if (existingProfile) {
      throw new BadRequestException('Profile already exists');
    }
    // Kiểm tra các trường không được phép null
    if (createProfileDto.userName == '' && createProfileDto.avatarUrl == '' ) {
      throw new BadRequestException('Name, avatarUrl, and bio cannot be empty');
    }


    // Tạo profile mới
    const profile = this.profileRepository.create(createProfileDto);
    profile.uid = uid;
    // Lưu profile
    return this.profileRepository.save(profile);


  }

  async getProfile(uid: string): Promise<Profile> {
      const profile = await this.profileRepository.findOne({ where: { uid } });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile
  }

  async updateProfile(uid: string, createProfileDto: CreateProfileDto): Promise<Profile> {
    console.log('updateProfileDto:', createProfileDto);
    const user = await this.profileRepository.findOne({ where: { uid } });
    if (!user) {
      throw new NotFoundException('User or profile not found');
    }
    console.log('user:', user);
    // Kiểm tra không cho phép chỉnh sửa email và uid
    if (createProfileDto.email && user.email !== createProfileDto.email) {
      throw new BadRequestException('Email cannot be changed');
    }
    // Kiểm tra các trường không được phép null
    if (!createProfileDto.userName || !createProfileDto.avatarUrl) {
      console.log('updateProfileDto:', createProfileDto);
      throw new ConflictException('Name, and ,avatarUrl cannot be empty');
    }

    //uid không được phép thay đổi
    if (createProfileDto.uid && user.uid !== createProfileDto.uid) {
      throw new BadRequestException('uid cannot be changed');
    }
    // Cập nhật profile
    await this.profileRepository.update({ uid }, createProfileDto);
    return this.profileRepository.findOne({ where: { uid } });



  }
}
