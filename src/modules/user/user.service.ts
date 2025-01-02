import { Injectable } from '@nestjs/common';
 import { UserRepository } from './user.repository';
 import { CreateUserDto } from './dto/create-user.dto';
 import { UpdateUserDto } from './dto/update-user.dto';

 @Injectable()
 export class UserService {
   constructor(private readonly userRepository: UserRepository) {}

   async createUser(createUserDto: CreateUserDto): Promise<any> {
     const user = await this.userRepository.create(createUserDto);
     return user;
   }

   async findAll(): Promise<any[]> {
     const users = await this.userRepository.findMany({});
     return users;
   }

   async findOne(id: string): Promise<any> {
     const user = await this.userRepository.findById(id);
     return user;
   }

   async findByPhone(phone: string): Promise<any> {
     const user = await this.userRepository.findByPhone(phone);
     return user;
   }

   async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
     const user = await this.userRepository.update(id, updateUserDto);
     return user;
   }

   async remove(id: string): Promise<any> {
     const user = await this.userRepository.findById(id);
     if (!user) {
       throw new Error('User not found');
     }
     await this.userRepository.update(id, { ...user, phone: null });
     return { message: 'User deleted successfully' };
   }
 }