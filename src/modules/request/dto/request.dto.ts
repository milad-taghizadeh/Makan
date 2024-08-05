import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsPhoneNumber, IsNotEmpty, IsString, Length, IsJSON, IsObject, IsNumber, ValidateNested } from 'class-validator';



export class LocationDto {
  @IsNumber()
  @IsNotEmpty()
  lat: number

  @IsNumber()
  @IsNotEmpty()
  long: number
}
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
  @IsObject()
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto
}


