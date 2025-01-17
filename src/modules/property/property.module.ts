import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PropertyRepository } from './property.repository';
import { RequestRepository } from '../request/request.repository';
import { MapService } from './map.service';
import { MapController } from './map.controller';
// import { AutocompleteController } from './autocomplete.controller';
// import { AutocompleteService } from './autocomplete.service';

// TODO: fix autocomplete
@Module({
  imports:[DatabaseModule],
  controllers: [PropertyController, MapController],
  providers: [PropertyService, PropertyRepository, RequestRepository, MapService],
})
export class PropertyModule {}
