import { ApiProperty } from '@nestjs/swagger';
import { PropertyStatus, PropertyType } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsNotEmpty,
  IsString,
  Length,
  IsObject,
  ValidateNested,
  IsEnum,
} from 'class-validator';

export class LocationDto {
  @IsNumber()
  @IsNotEmpty()
  lat: number;

  @IsNumber()
  @IsNotEmpty()
  long: number;
}

export class NewPropertyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 250)
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 300)
  description: string;

  // TODO: city picker
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
  @IsString()
  zip: string;

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;

  @ApiProperty({ enum: PropertyType })
  @IsEnum(PropertyType)
  @IsNotEmpty()
  type: PropertyType;

  @ApiProperty({ enum: PropertyStatus })
  @IsNotEmpty()
  @IsEnum(PropertyStatus)
  status: PropertyStatus;

  //   TODO: listing date and listingPrice???


  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  listingPrice: number;

  @ApiProperty()
  @IsNotEmpty()
  listingDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  bedrooms: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  bathrooms: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  squareFootage: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  lotSize: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  yearBuilt: number;

  //   FIXME: check this
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  architectureStyle: string;
}
