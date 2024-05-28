import { Field, InputType } from '@nestjs/graphql';
import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  ArrayNotEmpty,
  IsUUID,
} from 'class-validator';

@InputType()
export class CreateHouseInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  readonly name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  readonly description: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  readonly location: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  readonly amount: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  readonly type: string;

  @Field()
  @IsNotEmpty()
  @IsUUID()
  readonly ownerId: string;
}
