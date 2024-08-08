import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { NewPropertyDto } from './dto/property.dto';
import { PropertyRepository } from './property.repository';
import { RequestRepository } from '../request/request.repository';
import { PropertyMessage } from './messages/property.message';

@Injectable()
export class PropertyService {
  constructor(
    private readonly propertyRepository: PropertyRepository,
    private readonly requestRepository: RequestRepository,
  ) {}

  async createProperty(agentId: string, requestId: string, data: NewPropertyDto) {

    const agentRequest = await this.requestRepository.findById(requestId);
    if(!agentRequest) throw new NotFoundException(PropertyMessage.NOTFOUND_REQUEST_FOR_PROPERTY)
    if (agentId != agentRequest.agentId && agentRequest.agentId != null)
      throw new ForbiddenException(PropertyMessage.FORBIDDEN_PROPERTY);
    if (agentRequest.status != 'DONE')
      throw new BadRequestException(PropertyMessage.BADREQUEST_STATUS_PROPERTY);

    return await this.propertyRepository.create({
      ...data,
      agentId,
      requestsId: agentRequest.id,
      propertyType: agentRequest.type,
      location: JSON.parse(JSON.stringify(data.location)),
    });
  }

}
