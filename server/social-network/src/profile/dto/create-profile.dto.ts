import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  avatarUrl: string;

  @IsString()
  bio: string;

  @IsString()
  uid: string;
}
