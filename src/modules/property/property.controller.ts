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
import { JwtAgentGuard } from 'src/common/guards/auth.guard';
import { Agent } from 'src/common/decorators/agent.decorator';

@Controller('property')
@ApiTags('Property')
@UseGuards(JwtAgentGuard)
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post('new-property')
  @ApiConsumes(SwaggerConsumes.urlEncoded, SwaggerConsumes.Json)
  async createProperty(@Body() data: NewPropertyDto, @Agent() agent: AgentCookiePayload, @Body() requestId: string) {
    return await this.propertyService.createProperty(agent.AgentId, requestId, data);
  }
}
