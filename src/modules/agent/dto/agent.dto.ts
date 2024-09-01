import { Agent_Status } from '@prisma/client';
import { IsString, IsOptional, IsEnum } from 'class-validator';

export class AgentDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsEnum(Agent_Status)
  status: Agent_Status;

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