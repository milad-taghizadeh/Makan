import { Injectable, Req, Res, UnauthorizedException } from '@nestjs/common';
import {NewRequestDto } from './dto/request.dto';
import { RequestRepository } from './request.repository';
import { Request, Response } from 'express';

@Injectable()
export class RequestService {
  constructor(
    private readonly requestRepository: RequestRepository,
  ){}

  async sendRequest(newRequestDto: NewRequestDto) {
    return null
  }

  async getUserId(@Req() req: Request){
    const accessToken = req.cookies
    if (!accessToken) {
      return new UnauthorizedException('err, unauthorized');
    }

  }

}
