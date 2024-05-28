import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UserController } from './user.controller';
import { CloudinaryModule } from 'src/config/cloudinary/cloudinary.module';

@Module({
  imports: [forwardRef(() => CloudinaryModule)],
  controllers: [UserController],
  providers: [UserResolver, UserService],
})
export class UserModule {}
