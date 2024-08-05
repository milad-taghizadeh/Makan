import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RequestService } from './request.service';
import { NewRequestDto } from './dto/request.dto';
import { User } from 'src/common/decorators/user.decorator';
import { CookiePayload } from '../auth/types/payload';
import { JwtGuard } from 'src/common/guards/auth.guard';

@Controller('request')
@UseGuards(JwtGuard)
export class RequestController {
  constructor(private readonly requestService: RequestService) { }

  @Post()
  sendRequest(
    @User() user: CookiePayload,
    @Body() newRequestDto: NewRequestDto
  ) {
    return this.requestService.sendRequest(user.UserId, newRequestDto);
  }


}
