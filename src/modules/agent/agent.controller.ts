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
  async create(@Body() createAgentDto: CreateAgentDto): Promise<any> {
    const agent = await this.agentService.create(createAgentDto);
    return agent;
  }

  @Get()
  async findAll(): Promise<any> {
    const agents = await this.agentService.findAll();
    return agents;
  }

  @Get(':phone')
  async findOne(@Param('phone') phone: string): Promise<any> {
    const agent = await this.agentService.findOne(phone);
    return agent;
  }

  @Patch(':phone')
  async update(@Param('phone') phone: string, @Body() updateAgentDto: UpdateAgentDto): Promise<any> {
    const updatedAgent = await this.agentService.update(phone, updateAgentDto);
    return updatedAgent;
  }

  @Delete(':phone')
  async remove(@Param('phone') phone: string): Promise<any> {
    const result = await this.agentService.remove(phone);
    return result;
  }
}
