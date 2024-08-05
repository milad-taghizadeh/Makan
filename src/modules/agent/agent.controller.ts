import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AgentService } from './agent.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { JwtGuard } from 'src/common/guards/auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { CookiePayload } from '../auth/types/payload';

@Controller('agent')
@UseGuards(JwtGuard)
export class AgentController {
  constructor(private readonly agentService: AgentService) { }

  @Post()
  create(
    @Body() createAgentDto: CreateAgentDto,
    @User() user: CookiePayload
  ) {
    console.log(user);
    return this.agentService.create(createAgentDto);
  }

  @Get()
  findAll() {
    return this.agentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAgentDto: UpdateAgentDto) {
    return this.agentService.update(+id, updateAgentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agentService.remove(+id);
  }
}
