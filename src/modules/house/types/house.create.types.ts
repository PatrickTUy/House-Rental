import { Field, InputType } from '@nestjs/graphql';
import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
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
  @IsNumber()
  readonly rooms: number;

  @Field()
  @IsNumber()
  readonly baths: number;

  @Field()
  @IsNumber()
  readonly lotSize: number;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  readonly propertySize: number;

  @Field()
  @IsNotEmpty()
  @IsUUID()
  readonly ownerId: string;
}

@InputType()
export class UpdateHouseInput {
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
  @IsNumber()
  readonly rooms: number;

  @Field()
  @IsNumber()
  readonly baths: number;

  @Field()
  @IsNumber()
  readonly lotSize: number;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  readonly propertySize: number;
}
