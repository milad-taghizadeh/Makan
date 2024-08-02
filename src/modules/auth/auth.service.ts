import { BadRequestException, Injectable, Scope } from '@nestjs/common';

import { TokenService } from './token.service';
import { UserRepository } from '../user/user.repository';
import { OtpRepository } from './otp.repository';
import { CheckOtpDto, SendOtpDto } from './dto/auth.dto';
import { User } from '@prisma/client';
import { AuthMessage } from './messages/auth.messages';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly otpRepository: OtpRepository,
    private tokenService: TokenService,
  ) {}

  async sendOtp(data: SendOtpDto) {

  const existingOtp = await this.otpRepository.findByPhone(data.phone);

  if (existingOtp && existingOtp.expiresIn > new Date()) {
    return existingOtp.code;
  }


    const code = Math.floor(Math.random() * 90000) + 10000;
    const TWO_MINUTES = 2 * 60 * 1000;

    const otp = await this.otpRepository.create({
      code: String(code),
      expiresIn: new Date(Date.now() + TWO_MINUTES),
      isUsed: false,
      phoneNumber: data.phone,
    });


    // if (otp.code && otp.expiresIn > new Date() && otp.isUsed === false) {
    //   throw new BadRequestException(AuthMessage.WAIT_FOR_EXPIRE);
    // }
    //TODO send otp via sms
    return otp.code;
  }

  async confirmOtp(data: CheckOtpDto) {
    const dbOtp = await this.otpRepository.findLastOtp(
      data.phoneNumber,
      data.code,
    );

    if (!dbOtp || dbOtp.expiresIn < new Date()) {
      throw new BadRequestException(AuthMessage.INVALID_OTP_CODE);
    }

    await this.otpRepository.update(dbOtp.id, { isUsed: true });

    const user = await this.userRepository.findByPhone(data.phoneNumber);
    if (user) {
      return this.tokenService.createOtpToken({ UserId: user.id });
    } else {
      const user = await this.register(data.phoneNumber);
      return this.tokenService.createOtpToken({ UserId: user.id });
    }
  }

  private async register(phoneNumber: string): Promise<User> {
    return await this.userRepository.create({
      phone: phoneNumber,
      email: null,
      firstname: null,
      lastName: null,
    });
  }
}
