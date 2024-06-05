import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserInput } from './types/user.create.types';
import { CloudinaryService } from 'src/config/cloudinary/cloudinary.service';

import {
  FileInterceptor,
  FileFieldsInterceptor,
} from '@nestjs/platform-express';
import { UserInput } from 'src/database/graphql/graphql';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('picture'))
  async registerUser(
    @Body() userInput: UserInput,
    @UploadedFile()
    file: Express.Multer.File,
  ): Promise<any> {
    // console.log('++++++++');
    try {
      const uploadResult = await this.cloudinaryService.uploadImage(file);
      const pictureUrl = uploadResult.secure_url;

      return await this.userService.registerUser(userInput, {
        picture: pictureUrl,
      });
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('delete/:id')
  deleteUser(@Param('id') id: string) {}
}
