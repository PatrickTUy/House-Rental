import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { QueryRepository } from 'src/database/neo4j/query.repository';
import { CreateHouseInput } from './types/house.create.types';
import { generateUuid } from 'src/utils/uuid.util';
import { CloudinaryService } from 'src/config/cloudinary/cloudinary.service';

@Injectable()
export class HouseService {
  constructor(
    private readonly queryRepo: QueryRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async createHouse(
    createHouseInput: CreateHouseInput,
    files: { photos: Express.Multer.File[] },
  ): Promise<any> {
    const { name, description, amount, location, type, ownerId } =
      createHouseInput;

    try {
      if (
        type !== 'apartment' &&
        type !== 'villa' &&
        type !== 'office' &&
        type !== 'bungalow' &&
        type !== 'house'
      ) {
        throw new HttpException(
          'House type is not valid',
          HttpStatus.BAD_REQUEST,
        );
      }
      const images = [];

      for (let i = 0; i < files.photos?.length; i++) {
        const image = files && files?.photos[i];
        const file =
          files &&
          (await this.cloudinaryService.uploadImage(image).catch((err) => {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
          }));
        images.push(file?.url);
      }

      const house = await this.queryRepo
        .initQuery()
        .raw(
          `
  
      MATCH (user: User {id: $ownerId})
  
        CREATE (house:House {
          id:$houseId,
          name:$name,
          description:$description,
          location:$location,
          type:$type,
          amount:$amount,
          ownerId:$ownerId,
          photos:$photos
        })
  
        MERGE (house)-[:OWNER]->(user)
        RETURN house
        `,
          {
            houseId: generateUuid(),
            ownerId,
            name,
            description,
            location,
            type,
            amount,
            photos: images,
          },
        )
        .run();

      if (house?.length > 0) {
        const {
          house: { properties },
        } = house[0];

        return {
          ...properties,
        };
      }
    } catch (error) {
      console.log('Error creating a house:', error);
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getHouses(): Promise<any> {
    const houses = await this.queryRepo
      .initQuery()
      .raw(
        `
      MATCH (house: House) RETURN house
      `,
      )
      .run();
    if (houses?.length > 0) {
      console.log(houses, 'houses');
      const resultsArray = [];
      for (let i = 0; i < houses.length; i++) {
        const obj = {};
        obj['id'] = houses[i].house.properties.id;
        obj['name'] = houses[i].house.properties.name;
        obj['description'] = houses[i].house.properties.description;
        obj['location'] = houses[i].house.properties.location;
        obj['amount'] = houses[i].house.properties.amount;
        obj['type'] = houses[i].house.properties.type;
        obj['photos'] = houses[i].house.properties.photos;

        resultsArray.push(obj);
      }

      return resultsArray;
    }
  }

  async getHouse(id: string): Promise<any> {
    const house = await this.queryRepo
      .initQuery()
      .raw(
        `
    MATCH(house: House {Id: $id}) RETURN house
    `,
        { id },
      )
      .run();

    if (house?.length > 0) {
      const {
        house: { properties },
      } = house[0];

      return {
        id: properties.id,
        ...properties,
      };
    }
  }

  async deleteHouse(id: string): Promise<any> {
    console.log(id, 'this is the id chosen');
    const result = await this.queryRepo
      .initQuery()
      .raw(
        `
    MATCH (house: House {Id: $id}) 
        WITH house, count(house) as houseCount
        WHERE houseCount > 0
        DELETE house
        RETURN houseCount
    `,
        { id },
      )
      .run();

    if (result[0]?.userCount === 0 || result?.length === 0) {
      throw new HttpException('House not found', HttpStatus.BAD_REQUEST);
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'House deleted successfully',
    };
  }
}
