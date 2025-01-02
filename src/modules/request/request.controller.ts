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
import { JwtGuard } from 'src/common/guards/auth.guard';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SwaggerConsumes } from 'src/common/enums/swagger.consumes.enum';
import { Agent } from 'src/common/decorators/agent.decorator';
import { JwtAgentGuard } from 'src/common/guards/auth-agent.guard';

@Controller('request')
@ApiTags('Request')
export class RequestController {
  constructor(private readonly requestService: RequestService) { }

  @Post('new')
  @UseGuards(JwtGuard)
  @ApiConsumes(SwaggerConsumes.urlEncoded, SwaggerConsumes.Json)
  async sendRequest(
    @User() user: CookiePayload,
    @Body() newRequestDto: NewRequestDto
  ) {
    return await this.requestService.sendRequest(user.UserId, newRequestDto);
  }

  @Post('accept')
  @UseGuards(JwtAgentGuard)
  @ApiConsumes(SwaggerConsumes.urlEncoded, SwaggerConsumes.Json)
  async acceptRequest(
    @Agent() agent: AgentCookiePayload,
    @Body('id') id: string
  ) {
    return await this.requestService.acceptRequest(id, agent.AgentId);
  }

  @Post('cancel')
  @UseGuards(JwtGuard)
  @ApiConsumes(SwaggerConsumes.urlEncoded, SwaggerConsumes.Json)
  async cancelRequest(
    @User() user: CookiePayload,
    @Body('id') id: string
  ) {
    return await this.requestService.cancelRequest(id, user.UserId);
  }

  @Get('get/reqid/:id')
  @ApiConsumes(SwaggerConsumes.urlEncoded, SwaggerConsumes.Json)
  async getReqById(
    @Param('id') id: string
  ) {
    return await this.requestService.getReqById(id);
  }

  @Get('get/userid/:userid')
  @ApiConsumes(SwaggerConsumes.urlEncoded, SwaggerConsumes.Json)
  async indexUserRequests(
    @Body('userid') userId: string
  ) {
    return await this.requestService.indexUserRequests(userId);
  }

}
