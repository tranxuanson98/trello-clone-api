import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/resgister.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) 
        private userRepository: Repository<User>
    ){

    }

    async create(registerDto: RegisterDto): Promise<User> {
        var createUser = new User();
        createUser.name = registerDto.name;
        createUser.email = registerDto.email;
        createUser.password = registerDto.password;
        return await this.userRepository.save(registerDto)
    }

    async findOne(condition: any): Promise<User> {
        return await this.userRepository.findOne(condition);
    }
}
