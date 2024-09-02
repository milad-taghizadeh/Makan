import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AgentService } from './agent.service';
import { AgentDto } from './dto/agent.dto';
import { User } from 'src/common/decorators/user.decorator';
import { CookiePayload } from '../auth/types/payload';
import { Agent } from 'src/common/decorators/agent.decorator';
import { JwtAgentGuard } from 'src/common/guards/auth-agent.guard';

@Controller('agent')
// TODO: build agent controller again 
@UseGuards(JwtAgentGuard)
export class AgentController {
  constructor(private readonly agentService: AgentService) { }

  @Post()
  async createAgent(@Body() agentDto: AgentDto): Promise<any> {
    const agent = await this.agentService.create(agentDto);
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
  async update(@Param('phone') phone: string, @Body() agentDto: AgentDto): Promise<any> {
    const updatedAgent = await this.agentService.update(phone, agentDto);
    return updatedAgent;
  }

  @Delete(':phone')
  async remove(@Param('phone') phone: string): Promise<any> {
    const result = await this.agentService.remove(phone);
    return result;
  }

//   @Patch(':requestId/select')
//  async selectRequest(@Param('requestId') requestId: string, @Agent() agent_:any): Promise<any> {
//    const agent = await this.agentService.findOne(String(this.agentService.getAgentPhone(agent_)));
//    if (!agent) {
//      return { message: 'Agent not found' };
//    }
//    const requestToUpdate = await this.requestRepository.findById(requestId);
//    if (!requestToUpdate) {
//      return { message: 'Request not found' };
//    }
//    if (requestToUpdate.agentId) {
//      return { message: 'Request already assigned to an agent' };
//    }
//    await this.requestRepository.update(requestId, { agentId: agent.id });
//    return { message: 'Request assigned to agent successfully' };
//  }

  
}
