import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { AgentDto } from './dto/agent.dto';
import { AgentRepository } from './agent.repository';
import { AgentMessages } from './messages/agent.messages';
import { Agent } from 'src/common/decorators/agent.decorator';

@Injectable()
export class AgentService {
  constructor(private readonly agentRepository: AgentRepository) {}

  async create(agentDto: AgentDto): Promise<any> {
    const agent = await this.agentRepository.create(agentDto);
    return agent;
  }

  async findAll(): Promise<any> {
    const agents = await this.agentRepository.findMany({});
    return agents;
  }

  async findOne(phone: string): Promise<any> {
    const agent = await this.agentRepository.findByPhone(phone);
    if (!agent) return new NotFoundException(AgentMessages.NOT_FOUND_AGENT)
    return agent;
  }

  async update(phone: string, agentDto:AgentDto): Promise<any> {
    const agent = await this.agentRepository.findByPhone(phone);
    if (!agent) {
      return { message: 'Agent not found' };
    }
    const updatedAgent = await this.agentRepository.update(agent.id, agentDto);
    return { message: 'Agent updated successfully', updatedAgent };
  }

  async remove(phone: string): Promise<any> {
    const agent = await this.agentRepository.findByPhone(phone);
    if (!agent) {
      return { message: 'Agent not found' };
    }
    if (agent.status == "DELETED") throw new BadRequestException(AgentMessages.REMOVE_AGENT_BADREQUEST)
    await this.agentRepository.update(agent.id, { status: 'DELETED' });
    return { message: 'Agent deleted successfully' };
  }
  
  async getAgentPhone(agent: any): Promise<string> {
    return agent.phone;
  }
}
