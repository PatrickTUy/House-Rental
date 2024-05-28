import {
  BadRequestException,
  ConflictException,
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { QueryRepository } from 'src/database/neo4j/query.repository';
// import { CreateUserInput } from './types/user.create.types';
import { UserInput } from 'src/database/graphql/graphql';
import { FileUpload } from './types/user.create.types';
import { generateUuid } from 'src/utils/uuid.util';
import { hash } from 'bcrypt';
import { CloudinaryService } from 'src/config/cloudinary/cloudinary.service';

@Injectable()
export class UserService {
  constructor(
    private readonly queryRepo: QueryRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async registerUser(
    createUserInput: UserInput,
    file: FileUpload,
  ): Promise<any> {
    const { firstName, lastName, email, phone, userType, password } =
      createUserInput;

    const hashedPassword = await hash(password, 10);

    try {
      const existingUser = await this.queryRepo
        .initQuery()
        .raw(
          `MATCH (user:User {email: $email})
          RETURN user`,
          { email },
        )
        .run();
      if (existingUser?.length > 0) {
        throw new HttpException('Email is already taken', HttpStatus.CONFLICT);
      }

      const user = await this.queryRepo
        .initQuery()
        .raw(
          `
      MERGE (user:User {email:$email})
       ON CREATE SET user.id = $userId,
                     user.firstName = $firstName,
                     user.lastName = $lastName,
                     user.email = $email,
                     user.phone = $phone,
                     user.userType = $userType,
                     user.picture = $picture,
                     user.password = $hashedPassword

                     RETURN user
      `,
          {
            userId: generateUuid(),
            email,
            phone,
            firstName,
            lastName,
            userType,
            picture: file.picture
              ? file.picture
              : 'https://res.cloudinary.com/patricktuy/image/upload/v1644931315/l9kurrans7sb4okx9ckb.jpg',
            hashedPassword,
          },
        )
        .run();

      if (user?.length > 0) {
        const {
          user: { properties },
        } = user[0];

        return {
          ...properties,
        };
      }

      throw new BadRequestException('User creation failed');
    } catch (error) {
      console.log('Error creating a user:', error);
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUsers(): Promise<any> {
    const users = await this.queryRepo
      .initQuery()
      .raw(
        `
    MATCH (user:User) RETURN user
    `,
      )
      .run();
    console.log(users, 'users display');
    if (users?.length > 0) {
      const resultsArray = [];
      for (let i = 0; i < users.length; i++) {
        const obj = {};
        obj['id'] = users[i].user.properties?.id;
        obj['firstName'] = users[i].user.properties?.firstName;
        obj['lastName'] = users[i].user.properties?.lastName;
        obj['email'] = users[i].user.properties?.email;
        obj['phone'] = users[i].user.properties?.phone;
        obj['userType'] = users[i].user.properties?.userType;
        resultsArray.push(obj);
      }

      return resultsArray;
    }
  }

  async getUser(id: string): Promise<any> {
    const user = await this.queryRepo
      .initQuery()
      .raw(
        `
    MATCH (user:User {id: $id}) RETURN user
    `,
        { id },
      )
      .run();

    if (user?.length > 0) {
      const {
        user: { properties },
      } = user[0];

      return {
        id: properties.id,
        ...properties,
      };
    } else {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteUser(id: string): Promise<any> {
    const result = await this.queryRepo
      .initQuery()
      .raw(
        `
        MATCH (user:User {id: $id}) 
        WITH user, count(user) as userCount
        WHERE userCount > 0
        DELETE user
        RETURN userCount
        `,
        { id },
      )
      .run();

    if (result[0]?.userCount === 0 || result?.length === 0) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'User deleted successfully',
    };
  }
}
