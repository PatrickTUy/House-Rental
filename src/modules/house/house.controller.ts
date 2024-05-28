import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { HouseService } from './house.service';
import { CreateHouseInput } from './types/house.create.types';
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
}
