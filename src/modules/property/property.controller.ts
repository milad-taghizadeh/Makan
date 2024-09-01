import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { NewPropertyDto } from './dto/property.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SwaggerConsumes } from 'src/common/enums/swagger.consumes.enum';
import { AgentCookiePayload, CookiePayload } from '../auth/types/payload';
import { Agent } from 'src/common/decorators/agent.decorator';
import { JwtAgentGuard } from 'src/common/guards/auth-agent.guard';

@Controller('property')
@ApiTags('Property')
@UseGuards(JwtAgentGuard)
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post('new/:requestId')
  @ApiConsumes(SwaggerConsumes.urlEncoded, SwaggerConsumes.Json)
  async createProperty(@Body() data: NewPropertyDto, @Agent() agent: AgentCookiePayload, @Param('requestId') requestId
string) {
    return await this.propertyService.createProperty(agent.AgentId, requestId, data);
  }

  @Get()
  async getAllProperties() {
    return await this.propertyService.getAllProperties();
  }

  @Get(':id')
  async getPropertyById(@Param('id') id: string) {
    return await this.propertyService.getPropertyById(id);
  }

  @Get('agent/:agentId')
  async getPropertiesByAgentId(@Param('agentId') agentId: string) {
    return await this.propertyService.getPropertiesByAgentId(agentId);
  }

  @Get('request/:requestId')
  async getPropertiesByRequestId(@Param('requestId') requestId: string) {
    return await this.propertyService.getPropertiesByRequestId(requestId);
  }

  @Patch(':id')
  async updateProperty(@Param('id') id: string, @Body() data: NewPropertyDto) {
    return await this.propertyService.updateProperty(id, data);
  }

  @Delete(':id')
  async deleteProperty(@Param('id') id: string) {
    return await this.propertyService.deleteProperty(id);
  }
}