import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // GET /api/users
    @Get()
    getAllUsers(): Promise<User[]> {
        return this.usersService.findAll();
    }

    // GET /api/users/:id
    @Get(':id')
    getUserById(@Param('id') id: string): Promise<User | null> {
        return this.usersService.findById(id);
    }
}
