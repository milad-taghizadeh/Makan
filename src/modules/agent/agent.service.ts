import { Injectable } from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { AgentRepository } from './agent.repository';

@Injectable()
export class AgentService {
  constructor(private readonly agentRepository: AgentRepository) {}

  async create(createAgentDto: CreateAgentDto): Promise<any> {
    const agent = await this.agentRepository.create(createAgentDto);
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

  async update(phone: string, updateAgentDto: UpdateAgentDto): Promise<any> {
    const agent = await this.agentRepository.findByPhone(phone);
    if (!agent) {
      return { message: 'Agent not found' };
    }
    const updatedAgent = await this.agentRepository.update(agent.id, updateAgentDto);
    return { message: 'Agent updated successfully', updatedAgent };
  }

  async remove(phone: string): Promise<any> {
    const agent = await this.agentRepository.findByPhone(phone);
    if (!agent) {
      return { message: 'Agent not found' };
    }
    await this.agentRepository.update(agent.id, { status: 'DELETED' });
    return { message: 'Agent deleted successfully' };
  }
}
