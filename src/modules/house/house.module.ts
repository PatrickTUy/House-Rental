import { Module, forwardRef } from '@nestjs/common';
import { HouseService } from './house.service';
import { HouseResolver } from './house.resolver';
import { HouseController } from './house.controller';
import { CloudinaryModule } from 'src/config/cloudinary/cloudinary.module';

@Module({
  imports: [forwardRef(() => CloudinaryModule)],
  controllers: [HouseController],
  providers: [HouseResolver, HouseService],
})
export class HouseModule {}
