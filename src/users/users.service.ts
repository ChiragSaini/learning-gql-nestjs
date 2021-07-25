import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { GetUserArgs } from './dto/args/getUser.args';
import { GetUsersArgs } from './dto/args/getUsers.args';
import { CreateUserInput } from './dto/input/createUser.input';
import { DeleteUserInput } from './dto/input/deleteUser.input';
import { UpdateUserInput } from './dto/input/updateUser.input';
import { User } from './models/User';

@Injectable()
export class UsersService {
    private users: User[] = [
        {
            userId: 'chirag',
            email: 'chiragsaini7777@gmail.com',
            age: 23,
            isSubscribed: true,
        },
        {
            userId: 'sanchi',
            email: 'sanchisaini7777@gmail.com',
            age: 21,
            isSubscribed: false,
        }
    ];

    createUser(createUserData: CreateUserInput): User {
        const user: User = {
            userId: uuid(),
            ...createUserData,
        }
        this.users.push(user);
        return user;
    };

    updateUser(updateUserData: UpdateUserInput): User {
        const user = this.users.find(u => u.userId === updateUserData.userId);
        Object.assign(user, updateUserData);
        return user;
    }

    getUser(getUserArgs: GetUserArgs): User {
        return this.users.find(u => u.userId === getUserArgs.userId);
    }

    getUsers(getUsersArgs: GetUsersArgs): User[] {
        return getUsersArgs.userIds.map(userId => this.getUser({ userId }))
    }

    getAllUsers(): User[]{
        return this.users;
    }

    deleteUser(deleteUserData: DeleteUserInput): User {
        const userIdx = this.users.findIndex(user => user.userId === deleteUserData.userId);
        const user = this.users[userIdx];
        this.users.splice(userIdx, 1);
        return user;
    }
};
