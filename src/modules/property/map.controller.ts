import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { MapService } from './map.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SwaggerConsumes } from 'src/common/enums/swagger.consumes.enum';
import { LocationDto } from './dto/property.dto';

@Controller('map')
@ApiTags('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Post('search-properties')
  @ApiConsumes(SwaggerConsumes.Json)
  async searchPropertiesInPolygon(@Body() polygon: LocationDto[]): Promise<any> {
    console.log(polygon);
    return await this.mapService.searchPropertiesInPolygon(polygon);
  }
}
