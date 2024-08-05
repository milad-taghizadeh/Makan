import { Injectable } from '@nestjs/common';
import { Repository } from 'src/common/interfaces/repository';
import { $Enums, Prisma, Requests, RequestStatus } from '@prisma/client';
import { PrismaService } from 'src/database/database.service';

@Injectable()
export class RequestRepository implements Repository<Requests> {

    constructor(private readonly prismaService: PrismaService) { }
    async create(data: Omit<Requests, "id" | "createdAt" | "updatedAt">): Promise<Requests> {
        return await this.prismaService.requests.create({
            data: {
                ...data
            }
        })
    }

    async update(id: string, data: Partial<Requests>): Promise<Requests> {
        return await this.prismaService.requests.update({
            where: {
                id
            },
            data: {
                ...data
            }
        })
    }

    async findById(id: string): Promise<Requests> {
        return await this.prismaService.requests.findUnique({
            where: {
                id
            }
        })
    }

    async deleteById(id: string): Promise<Requests> {
        return await this.prismaService.requests.delete({
            where: {
                id
            }
        })
    }

    async findByStatus(status: $Enums.RequestStatus): Promise<Requests[]> {
        // FIXME: fix this error
        return await this.prismaService.requests.findMany({
            where: {
                status
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    }

}
