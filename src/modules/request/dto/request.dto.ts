import { ApiProperty } from '@nestjs/swagger';
import { PropertyType } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsPhoneNumber, IsNotEmpty, IsString, Length, IsJSON, IsObject, IsNumber, ValidateNested, IsEnum } from 'class-validator';



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
  @IsNumber()
  squareFootage: number;

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

  @ApiProperty({enum: PropertyType})
  @IsEnum(PropertyType)
  @IsNotEmpty()
  type:PropertyType;

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto
}


