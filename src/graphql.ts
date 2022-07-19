
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class SignUpInput {
    email: string;
    password: string;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
}

export class SignInInput {
    email: string;
    password: string;
}

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
    status?: Nullable<string>;
    role?: Nullable<string>;
    confirmationToken?: Nullable<string>;
    resetToken?: Nullable<string>;
    refreshToken?: Nullable<string>;
}

export abstract class IMutation {
    abstract signUp(signUpInput?: Nullable<SignUpInput>): boolean | Promise<boolean>;

    abstract signIn(signInInput?: Nullable<SignInInput>): string | Promise<string>;

    abstract refreshToken(email?: Nullable<string>): string | Promise<string>;

    abstract createUser(createUserInput?: Nullable<CreateUserInput>): User | Promise<User>;

    abstract updateUser(updateUserInput?: Nullable<UpdateUserInput>): User | Promise<User>;

    abstract deleteUser(id: string): Nullable<boolean> | Promise<Nullable<boolean>>;
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

type Nullable<T> = T | null;
