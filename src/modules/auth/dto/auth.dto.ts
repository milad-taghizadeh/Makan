import { ApiProperty } from '@nestjs/swagger';
import { AuthType } from '../enums/type.enum';
import { AuthUserType } from '../enums/user-type.enum';
import { IsEnum, IsNotEmpty, IsPhoneNumber, IsString, Length } from 'class-validator';

export class SendOtpDto {

  @ApiProperty()
  @IsPhoneNumber("IR")
  @IsNotEmpty()
  @IsString()
  phone: string
}

export class CheckOtpDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber("IR")
  phoneNumber: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(5, 5)
  code: string;

  @ApiProperty({enum:AuthUserType})
  @IsNotEmpty()
  @IsString()
  @IsEnum(AuthUserType)
  userType: AuthUserType
}
