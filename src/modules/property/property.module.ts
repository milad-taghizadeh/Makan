import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PropertyRepository } from './property.repository';
import { RequestRepository } from '../request/request.repository';

@Module({
  imports:[DatabaseModule],
  controllers: [PropertyController],
  providers: [PropertyService, PropertyRepository, RequestRepository],
})
export class PropertyModule {}
