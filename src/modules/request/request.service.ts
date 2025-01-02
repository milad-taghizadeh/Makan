import { BadRequestException, ForbiddenException, Injectable, NotFoundException, Req, Res, UnauthorizedException } from '@nestjs/common';
import { NewRequestDto } from './dto/request.dto';
import { RequestRepository } from './request.repository';
import { Request, Response } from 'express';
import { AcceptRequestMessages, CancelRequestMessages, RequestMessages } from './messages/request.messages';

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
      location: JSON.parse(JSON.stringify(newRequestDto.location)),
    })
  }

  async acceptRequest(id: string, agentId: string) {
    const userRequest = await this.getReqById(id)
    const status = userRequest.status
    if (status == "CANCELED") throw new BadRequestException(AcceptRequestMessages.BADREQUEST_STATUS_CANCELED_ACCEPT_REQUEST);
    if (status == "EXPIRED") throw new BadRequestException(AcceptRequestMessages.BADREQUEST_STATUS_EXPIRED_ACCEPT_REQUEST);
    if (status == "DONE") throw new BadRequestException(AcceptRequestMessages.BADREQUEST_STATUS_DONE_ACCEPT_REQUEST)
    const acceptRequest = await this.requestRepository.update(id, {
      agentId,
      status: "DONE"
    })
    return acceptRequest;
  }

  async cancelRequest(id: string, userId: string) {
    const request = await this.getReqById(id)
    if (request.userId != userId) {
      throw new ForbiddenException(RequestMessages.FORBIDDEN_REQUEST)
    }
    if (request.status == "CANCELED") throw new BadRequestException(CancelRequestMessages.BADREQUEST_STATUS_CANCELED_CANCEL_REQUEST);
    if (request.status == "EXPIRED") throw new BadRequestException(CancelRequestMessages.BADREQUEST_STATUS_EXPIRED_CANCEL_REQUEST);
    // TODO: cancel an accepted request
    return await this.requestRepository.update(id, {
      status: 'CANCELED'
    })
  }

  // async deleteRequest(id: string) {
  //   return await this.requestRepository.deleteById(id)
  // }
  // TODO: add expiring request feature

  async indexUserRequests(userId: string) {
    return await this.requestRepository.indexUserRequests(userId)
  }

  async getReqById(id: string) {
    const userRequest = await this.requestRepository.findById(id);
    if (!userRequest) throw new NotFoundException(RequestMessages.NOTFOUND_REQUEST);
    return userRequest
  }

}
