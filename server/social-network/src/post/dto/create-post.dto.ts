import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  id: number;


  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsNotEmpty()
  @IsString()
  uid: string;

  @IsArray()
  @IsOptional()
  imageUrls?: string[];



}