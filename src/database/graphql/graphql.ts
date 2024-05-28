
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class HouseInput {
    id: string;
    name: string;
    description: string;
    location: string;
    amount: string;
    type: string;
    ownerId: string;
    photos: Nullable<string>[];
}

export class UserInput {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    userType: string;
    password?: Nullable<string>;
}

export abstract class IQuery {
    abstract welcomeMessage(): string | Promise<string>;

    abstract getHouses(): Nullable<Nullable<House>[]> | Promise<Nullable<Nullable<House>[]>>;

    abstract getHouse(id: string): Nullable<House> | Promise<Nullable<House>>;

    abstract getUsers(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;

    abstract getUser(id: string): User | Promise<User>;
}

export class House {
    id: string;
    name: string;
    description: string;
    location: string;
    amount: string;
    ownerId: string;
    photos: Nullable<string>[];
}

export abstract class IMutation {
    abstract addHouse(houseInput: HouseInput): House | Promise<House>;

    abstract deleteHouse(id: string): Nullable<House> | Promise<Nullable<House>>;

    abstract registerUser(userInput: UserInput): Nullable<User> | Promise<Nullable<User>>;

    abstract deleteUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    userType: string;
    password?: Nullable<string>;
}

export class FileUpload {
    picture?: Nullable<string>;
}

type Nullable<T> = T | null;
