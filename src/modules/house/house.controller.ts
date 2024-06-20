import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Patch,
  Param,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { HouseService } from './house.service';
import { CreateHouseInput, UpdateHouseInput } from './types/house.create.types';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { HouseInput } from 'src/database/graphql/graphql';

@Controller('house')
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  @Post('')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'photos', maxCount: 20 }]))
  async createHouse(
    @Body() houseInput: CreateHouseInput,
    @UploadedFiles()
    files: {
      photos: Express.Multer.File[];
    },
  ) {
    try {
      return await this.houseService.createHouse(houseInput, files);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // @Patch(':id')
  // @UseInterceptors(FileFieldsInterceptor([{ name: 'photos', maxCount: 20 }]))
  // async updateHouse(
  //   @Body() houseInput: UpdateHouseInput,
  //   @UploadedFiles()
  //   files: {
  //     photos: Express.Multer.File[];
  //   },
  // ) {
  //   try {
  //     return await this.houseService.updateHouse(id, houseInput, files);
  //   } catch (error) {
  //     throw new HttpException(
  //       error.message || 'Internal Server Error',
  //       error.status || HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }
}
