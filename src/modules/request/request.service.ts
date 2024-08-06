import { ForbiddenException, Injectable, Req, Res, UnauthorizedException } from '@nestjs/common';
import { NewRequestDto } from './dto/request.dto';
import { RequestRepository } from './request.repository';
import { Request, Response } from 'express';
import { RequestMessages } from './messages/request.messages';

@Injectable()
export class RequestService {
  constructor(
    private readonly requestRepository: RequestRepository,
  ) { }


  async sendRequest(userId: string, newRequestDto: NewRequestDto) {
    return await this.requestRepository.create({
      ...newRequestDto,
      userId,
      status: 'PENDING',
      location: JSON.parse(JSON.stringify(newRequestDto.location))
    })
  }

  async acceptRequest(id: string, agentId: string) {
    return await this.requestRepository.update(id, {
      agentId,
      status: "DONE"
    })
  }

  async cancelRequest(id: string, userId: string) {
    const request = await this.requestRepository.findById(id)
    if (request.userId != userId) {
      throw new ForbiddenException(RequestMessages.FORBIDDEN_REQUEST)
    }

    return await this.requestRepository.update(id, {
      status: 'CANCELED'
    })
  }

  // async deleteRequest(id: string) {
  //   return await this.requestRepository.deleteById(id)
  // }

  async indexUserRequests(userId: string) {
    return await this.requestRepository.indexUserRequests(userId)
  }

  async getReqById(id: string) {
    return await this.requestRepository.findById(id)
  }

}
