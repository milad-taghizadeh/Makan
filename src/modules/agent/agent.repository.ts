import { Injectable } from "@nestjs/common";
import { Agents } from "@prisma/client";
import { Repository } from "src/common/interfaces/repository";
import { PrismaService } from "src/database/database.service";
import { v4 as uuid } from "uuid";

@Injectable()
export class AgentRepository implements Repository<Agents> {

  constructor(
    private readonly prismaService: PrismaService
  ) { }

  async create(data: Agents): Promise<Agents> {
    return await this.prismaService.agents.create({
      data: {
        id: uuid(),
        ...data
      }
    })
  }

  async update(id: string, data: Partial<Agents>): Promise<Agents> {
    return await this.prismaService.agents.update({
      where: {
        id
      },
      data: {
        ...data
      }
    })
  }

  async findById(id: string): Promise<Agents> {
    return await this.prismaService.agents.findUnique({
      where: {
        id
      },
      include: {
        Requests: true
      }
    })
  }

  async findMany(filters: Partial<Agents>): Promise<Agents[]> {
    return await this.prismaService.agents.findMany({
      where: {
        ...filters
      },
      include: {
        Requests: true
      }
    })
  }
}