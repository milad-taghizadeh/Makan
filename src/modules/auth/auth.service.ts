import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'src/database/database.service';

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: PrismaService) {}
  create(createAuthDto: AuthDto) {
    this.databaseService.student;
    return 'This action adds a new auth';
  }
}
