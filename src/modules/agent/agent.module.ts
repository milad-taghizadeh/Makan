import { Module } from '@nestjs/common';
import { AgentService } from './agent.service';
import { AgentController } from './agent.controller';
import { PrismaService } from 'src/database/database.service';
import { AgentRepository } from './agent.repository';

@Module({
  controllers: [AgentController],
  providers: [AgentService, AgentRepository, PrismaService],
})
export class AgentModule {}
