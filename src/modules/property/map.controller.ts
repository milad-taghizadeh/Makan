import { Controller, Get, Post, Body } from '@nestjs/common';
import { MapService } from './map.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SwaggerConsumes } from 'src/common/enums/swagger.consumes.enum';

@Controller('map')
@ApiTags('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Post('search-properties')
  @ApiConsumes(SwaggerConsumes.urlEncoded, SwaggerConsumes.Json)
  async searchPropertiesInPolygon(@Body() polygon: { x: number; y: number }[]): Promise<any> {
    return await this.mapService.searchPropertiesInPolygon(polygon);
  }
}
