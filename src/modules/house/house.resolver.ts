import { Query, Resolver, Args, Mutation } from '@nestjs/graphql';
import { HttpException, HttpStatus } from '@nestjs/common';

import { HouseService } from './house.service';

@Resolver()
export class HouseResolver {
  constructor(private readonly houseService: HouseService) {}

  @Query()
  async getHouses(): Promise<any> {
    try {
      return await this.houseService.getHouses();
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Query()
  async getHouse(@Args('id') id: string): Promise<any> {
    try {
      return await this.houseService.getHouse(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Mutation()
  async deleteHouse(@Args('id') id: string): Promise<any> {
    try {
      return await this.houseService.deleteHouse(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
