import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsNotEmpty, IsString, Length, IsJSON } from 'class-validator';

export class NewRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 250)
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsNotEmpty()
  rooms: number;

  @ApiProperty()
  @IsJSON()
  location: any;
//FIXME: this type => json 
}
