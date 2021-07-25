import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { GetUserArgs } from "./dto/args/getUser.args";
import { GetUsersArgs } from "./dto/args/getUsers.args";
import { CreateUserInput } from "./dto/input/createUser.input";
import { DeleteUserInput } from "./dto/input/deleteUser.input";
import { UpdateUserInput } from "./dto/input/updateUser.input";
import { User } from "./models/User";
import { UsersService } from "./users.service";

@Resolver(() => User)
export class UsersResolver{

    constructor(private readonly userService: UsersService){};

    @Query(() => User, { name: 'user', nullable: true })
    getUser(
        @Args() getUserArgs: GetUserArgs
    ): User{
        return this.userService.getUser(getUserArgs);
    }

    @Query(() => [User], {name: 'users', nullable: 'items'})
    getUsers(
        @Args() getUsersArgs: GetUsersArgs
    ): User[]{
        return this.userService.getUsers(getUsersArgs);
    }

    @Query(() => [User], {name:'allUsers', nullable: 'items'})
    getAllUsers(): User[]{
        return this.userService.getAllUsers();
    }

    @Mutation(() => User)
    createUser(
        @Args('createUserData') createUserData: CreateUserInput
    ): User{
        return this.userService.createUser(createUserData);
    }

    @Mutation(() => User)
    updateUser(
        @Args('updateUserData') updateUserData: UpdateUserInput
    ): User{
        return this.userService.updateUser(updateUserData);
    }

    @Mutation(() => User)
    deleteUser(
        @Args('deleteUserData') deleteUserData: DeleteUserInput
    ): User{
        return this.userService.deleteUser(deleteUserData);
    }
}