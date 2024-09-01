import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { AgentDto } from './dto/agent.dto';
import { AgentRepository } from './agent.repository';
import { AgentMessages } from './messages/agent.messages';

@Injectable()
export class AgentService {
  constructor(private readonly agentRepository: AgentRepository) {}

  async create(agentDto: AgentDto): Promise<any> {
    const agent = await this.agentRepository.create(agentDto);
    return { message: 'Agent created successfully', agent };
  }

  async findAll(): Promise<any> {
    const agents = await this.agentRepository.findMany({});
    return { message: 'Agents retrieved successfully', agents };
  }

  async findOne(phone: string): Promise<any> {
    const agent = await this.agentRepository.findByPhone(phone);
    if (!agent) {
      return { message: 'Agent not found' };
    }
    return { message: 'Agent retrieved successfully', agent };
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
}
