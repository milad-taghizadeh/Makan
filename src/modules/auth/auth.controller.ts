import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CheckOtpDto, SendOtpDto } from './dto/auth.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SwaggerConsumes } from 'src/common/enums/swagger.consumes.enum';
import { Response } from 'express';
import { CookieKeys } from 'src/common/enums/cookie.enum';

@Controller('v1/auth')
@ApiTags('Auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Post('send-otp')
  @ApiConsumes(SwaggerConsumes.urlEncoded, SwaggerConsumes.Json)
  async sendOtp(
    @Body() data: SendOtpDto
  ) {
    return await this.authService.sendOtp(data)
  }

  @Post('confirm-otp')
  @ApiConsumes(SwaggerConsumes.urlEncoded, SwaggerConsumes.Json)
  async confirmOtp(
    @Body() data: CheckOtpDto,
    @Res() res: Response
  ) {
    const token = await this.authService.confirmOtp(data)

    res.cookie("accessToken", token, {
      // expires: ,
      httpOnly: true,
      path: "/",
      sameSite: "none",
      secure: false
    })
    res.end()
  }
}
