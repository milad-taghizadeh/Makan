import { IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsOptional()
    firstname: string;
 
    @IsString()
    @IsOptional()
    lastName: string;
 
    @IsString()
    @IsOptional()
    email: string;
 
    @IsString()
    phone: string;
  }