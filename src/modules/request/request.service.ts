import { Injectable, Req } from '@nestjs/common';
import {NewRequestDto } from './dto/request.dto';
import { RequestRepository } from './request.repository';

@Injectable()
export class RequestService {
  constructor(
    private readonly requestRepository: RequestRepository,
  ){}

  async sendRequest(newRequestDto: NewRequestDto, @Req() req: any) {
    const userId = req.CookieKeys('accessToken');
    console.log(userId);
  }

}
