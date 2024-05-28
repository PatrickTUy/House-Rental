import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
// import { CreateUserInput } from './types/user.create.types';
import { UserInput } from 'src/database/graphql/graphql';
import { HttpException, HttpStatus } from '@nestjs/common';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // @Mutation()
  // async registerUser(@Args('userInput') userInput: UserInput): Promise<any> {
  //   try {
  //     return await this.userService.registerUser(userInput);
  //   } catch (error) {
  //     console.log('error');
  //     throw new HttpException(
  //       error.message || 'Internal Server Error',
  //       error.status || HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  @Mutation()
  async deleteUser(@Args('id') id: string): Promise<any> {
    try {
      return await this.userService.deleteUser(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Query()
  async getUsers() {
    try {
      return await this.userService.getUsers();
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Query()
  async getUser(@Args('id') id: string) {
    try {
      return await this.userService.getUser(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
