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
import { RequestService } from './request.service';
import { NewRequestDto } from './dto/request.dto';
import { User } from 'src/common/decorators/user.decorator';
import { AgentCookiePayload, CookiePayload } from '../auth/types/payload';
import { JwtAgentGuard, JwtGuard } from 'src/common/guards/auth.guard';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SwaggerConsumes } from 'src/common/enums/swagger.consumes.enum';
import { Agent } from 'src/common/decorators/agent.decorator';

@Controller('request')
@ApiTags('Request')
export class RequestController {
  constructor(private readonly requestService: RequestService) { }

  @Post('new-request')
  @UseGuards(JwtGuard)
  @ApiConsumes(SwaggerConsumes.urlEncoded, SwaggerConsumes.Json)
  async sendRequest(
    @User() user: CookiePayload,
    @Body() newRequestDto: NewRequestDto
  ) {
    return await this.requestService.sendRequest(user.UserId, newRequestDto);
  }

  @Post('accept-request')
  @UseGuards(JwtAgentGuard)
  @ApiConsumes(SwaggerConsumes.urlEncoded, SwaggerConsumes.Json)
  async acceptRequest(
    @Agent() agent: AgentCookiePayload,
    @Body() id: string
  ) {
    return await this.requestService.acceptRequest(agent.AgentId, id);
  }

}
