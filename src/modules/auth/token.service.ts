import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CookiePayload } from './types/payload';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService
  ) { }

  createOtpToken(payload: CookiePayload): string {
    const token = this.jwtService.sign(payload, {
      secret: process.env.OTP_TOKEN_SECRET,
      expiresIn: 60 * 2,
    });
    return token;
  }

  verifyToken(token: string): CookiePayload {
    try {
      const payload: CookiePayload = this.jwtService.verify(token)
      return payload
    } catch {
      return
    }

  }
  verifyAgentToken(token: string): CookiePayload {
    try {
      const payload: CookiePayload = this.jwtService.verify(token)
      return payload
    } catch {
      return
    }

  }
}
