import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString, Length } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    description: 'it should be a valid phone number',
    example: '+989123456789',
    nullable: false,
  })
  @IsNotEmpty()
  @IsPhoneNumber('IR')
  @IsString()
  @Length(10, 13)
  phone: string;
}
