import { Injectable } from '@nestjs/common';
import { $Enums, Properties } from '@prisma/client';
import { Repository } from 'src/common/interfaces/repository';
import { PrismaService } from 'src/database/database.service';
import { v4 as uuid } from "uuid";

@Injectable()
export class PropertyRepository implements Repository<Properties> {

    constructor(
        private readonly prismaService : PrismaService
    ){}

    async create(data: Omit<Properties, "id" | "createdAt" | "updatedAt" >): Promise<Properties> {
        return await this.prismaService.properties.create({
            data : {
                ...data,
                id : uuid()
            },
        })
    }

    async update(id: string, data: Properties): Promise<Properties> {
        return await this.prismaService.properties.update({
            where: {
                id
            },
            data: {
                ...data
            }
        })
    }

    async findById(id: string): Promise<Properties> {
        return await this.prismaService.properties.findUnique({
            where: {
                id
            }
        })
    }

    async findByStatus(status:  $Enums.PropertyStatus): Promise<Properties[]> {
        return await this.prismaService.properties.findMany({
            where: {
                status
            },
            orderBy:{
                createdAt: "desc"
            }
        })
    }


    async indexAgentProperty(agentId: string) : Promise<Properties[]> {
        return await this.prismaService.properties.findMany({
            where : {
                agentId
            },
            orderBy : {createdAt: "desc"}
        })
    }

    async findByRequestId(requestsId: string) : Promise<Properties[]> {
        return await this.prismaService.properties.findMany({
            where : {
                requestsId
            },
            orderBy : {createdAt: "desc"}
        })
    }

    async findAll(): Promise<Partial<Properties>[]> {
        return await this.prismaService.properties.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })
    }
}
