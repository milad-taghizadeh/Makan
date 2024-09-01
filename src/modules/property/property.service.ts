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
import { Properties, PropertyStatus } from '@prisma/client';

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

  async getAllProperties() {
    return await this.propertyRepository.findAll();
  }

  async getPropertyById(id: string) {
    const property = await this.propertyRepository.findById(id);
    if (!property) {
      throw new NotFoundException(PropertyMessage.NOTFOUND_PROPERTY);
    }
    return property;
  }

  async getPropertiesByAgentId(agentId: string) {
    return await this.propertyRepository.indexAgentProperty(agentId);
  }

  async getPropertiesByRequestId(requestId: string) {
    return await this.propertyRepository.findByRequestId(requestId);
  }

  async updateProperty(id: string, data: Properties) {
    const property = await this.propertyRepository.findById(id);
    if (!property) {
      throw new NotFoundException(PropertyMessage.NOTFOUND_PROPERTY);
    }
    return await this.propertyRepository.update(id, data);
  }

  async deleteProperty(id: string) {
    const property = await this.propertyRepository.findById(id);
    if (!property) {
      throw new NotFoundException(PropertyMessage.NOTFOUND_PROPERTY);
    }
    return await this.propertyRepository.update(id, { status: PropertyStatus.DELETED });
  }
}
