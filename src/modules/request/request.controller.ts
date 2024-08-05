import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RequestService } from './request.service';
import { NewRequestDto } from './dto/request.dto';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) { }

  @Post()
  create(@Body() newRequestDto: NewRequestDto) {
    return this.requestService.create(newRequestDto);
  }
}
