import { Injectable } from '@nestjs/common';
import { PropertyRepository } from './property.repository';
import { LocationDto } from './dto/property.dto';

@Injectable()
export class MapService {
  constructor(private readonly propertyRepository: PropertyRepository) {}

  private pointInPolygon(point: LocationDto, polygon: LocationDto[]): boolean {
    const  x = point.long;
    const y = point.lat;
    const n = polygon.length;
    let inside = false;

    for (let i = 0, j = n - 1; i < n; j = i++) {
      const xi = polygon[i].long;
      const yi = polygon[i].lat;
      const xj = polygon[j].long;
      const yj = polygon[j].lat;

      const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

      if (intersect) {
        inside = !inside;
      }
    }

    return inside;
  }

  async searchPropertiesInPolygon(polygon: LocationDto[]): Promise<any> {
    const properties = await this.propertyRepository.findAll();
    const propertiesInPolygon = properties.filter((property) => {
      const point: LocationDto = {
        lat: Number(property.location["lat"]),
        long: Number(property.location["lng"]),
      };
      console.log(point)
      return this.pointInPolygon(point, polygon);
    });
    
    return propertiesInPolygon;
  }
}