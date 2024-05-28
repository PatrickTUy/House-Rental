import { Field, InputType } from '@nestjs/graphql';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  readonly id: string;

  @Field()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly firstName: string;

  @Field()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly lastName: string;

  @Field()
  @IsString()
  @IsEmail()
  @IsDefined()
  @IsNotEmpty()
  readonly email: string;

  @Field()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly phone: string;

  @Field()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly userType: string;

  @Field()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly password: string;
}

@InputType()
export class FileUpload {
  @IsString()
  readonly picture: string;
}
