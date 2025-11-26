import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

interface CreateUserParams {
    email: string;
    password: string;
    fullName?: string;
    role?: 'FREE' | 'PREMIUM';
}

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findById(id: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { id } });
    }

    findByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { email } });
    }

    async createUser(params: CreateUserParams): Promise<User> {
        const user = this.usersRepository.create({
            email: params.email,
            password: params.password,
            fullName: params.fullName,
            role: params.role ?? 'FREE',
        });
        return this.usersRepository.save(user);
    }
}
