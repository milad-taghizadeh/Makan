import { IsString, IsOptional } from 'class-validator';

export class CreateAgentDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  facePic: string;

  @IsString()
  @IsOptional()
  nationalCode: string;

  @IsString()
  @IsOptional()
  IDCardPicture: string;

  @IsString()
  @IsOptional()
  bio: string;

  @IsString()
  @IsOptional()
  company: string;

  @IsString()
  phone: string;
}