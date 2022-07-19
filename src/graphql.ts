
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateUserInput {
    email: string;
    password: string;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
}

export class UpdateUserInput {
    id: string;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    status: string;
    role: string;
    confirmationToken?: Nullable<string>;
    resetToken?: Nullable<string>;
}

export class User {
    id: string;
    email: string;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    status: string;
    role: string;
    confirmationToken?: Nullable<string>;
    resetToken?: Nullable<string>;
    createdAt: string;
    updatedAt: string;
}

export abstract class IQuery {
    abstract users(): Nullable<User[]> | Promise<Nullable<User[]>>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createUser(createUserInput?: Nullable<CreateUserInput>): User | Promise<User>;

    abstract updateUser(updateUserInput?: Nullable<UpdateUserInput>): User | Promise<User>;

    abstract deleteUser(id: string): Nullable<boolean> | Promise<Nullable<boolean>>;
}

type Nullable<T> = T | null;
