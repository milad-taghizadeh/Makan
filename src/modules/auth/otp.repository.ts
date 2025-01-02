import { Injectable } from "@nestjs/common";
import { Otp } from "@prisma/client";
import { Repository } from "src/common/interfaces/repository";
import { PrismaService } from "src/database/database.service";





@Injectable()
export class OtpRepository implements Repository<Otp> {

  constructor(
    private readonly prismaService: PrismaService
  ) { }

  async create(data: Omit<Otp, "id" | "createdAt" | "updatedAt">): Promise<Otp> {
    return await this.prismaService.otp.create({
      data: {
        ...data
      }
    })
  }

  async update(id: number, data: Partial<Otp>): Promise<Otp> {
    return await this.prismaService.otp.update({
      where: {
        id
      },
      data: {
        ...data
      }
    })
  }

  async findById(id: number): Promise<Otp> {
    return await this.prismaService.otp.findUnique({
      where: {
        id
      }
    })
  }

  async findByPhone(phoneNumber: string): Promise<Otp> {
    return await this.prismaService.otp.findFirst({
      where: {
        phoneNumber,
        isUsed: false,
      },
      orderBy: {
        createdAt: "desc"
      }
    })
  }

  async findLastOtp(phone: string, code: string): Promise<Otp> {
    return await this.prismaService.otp.findFirst({
      where: {
        phoneNumber: phone,
        isUsed: false,
        code,
      },
      orderBy: {
        expiresIn: "desc"
      }
    })
  }

}