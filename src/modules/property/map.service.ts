import { Injectable } from '@nestjs/common';
import { PropertyRepository } from './property.repository';

@Injectable()
export class MapService {
  constructor(private readonly propertyRepository: PropertyRepository) {}

  private pointInPolygon(point: { x: number; y: number }, polygon: { x: number; y: number }[]): boolean {
    const { x, y } = point;
    const n = polygon.length;
    let inside = false;

    for (let i = 0, j = n - 1; i < n; j = i++) {
      const xi = polygon[i].x;
      const yi = polygon[i].y;
      const xj = polygon[j].x;
      const yj = polygon[j].y;

      const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

      if (intersect) {
        inside = !inside;
      }
    }

    return inside;
  }

  async searchPropertiesInPolygon(polygon: { x: number; y: number }[]): Promise<any> {
    const properties = await this.propertyRepository.findAll();
    const propertiesInPolygon = properties.filter((property) => {
      
      const point = { x: Number(property.location["longitude"]), y: Number(property.location["latitude"]) };
      return this.pointInPolygon(point, polygon);
    });
  
    return propertiesInPolygon;
  }
}