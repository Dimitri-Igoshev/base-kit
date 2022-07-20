
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

export class ResetPasswordInput {
    password: string;
    token: string;
}

export class CreateMessageInput {
    text: string;
    userId: string;
}

export class UpdateMessageInput {
    id: string;
    text: string;
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

    abstract recoveryPassword(email?: Nullable<string>): boolean | Promise<boolean>;

    abstract resetPassword(resetPasswordInput?: Nullable<ResetPasswordInput>): boolean | Promise<boolean>;

    abstract createMessage(createMessageInput?: Nullable<CreateMessageInput>): Message | Promise<Message>;

    abstract updateMessage(updateMessageInput?: Nullable<UpdateMessageInput>): Message | Promise<Message>;

    abstract deleteMessage(id: string): boolean | Promise<boolean>;

    abstract createUser(createUserInput?: Nullable<CreateUserInput>): User | Promise<User>;

    abstract updateUser(updateUserInput?: Nullable<UpdateUserInput>): User | Promise<User>;

    abstract deleteUser(id: string): Nullable<boolean> | Promise<Nullable<boolean>>;
}

export class Message {
    id: string;
    text: string;
    createdAt: string;
    updatedAt: string;
    user: User;
}

export abstract class IQuery {
    abstract messages(): Nullable<Message[]> | Promise<Nullable<Message[]>>;

    abstract message(id: string): Nullable<Message> | Promise<Nullable<Message>>;

    abstract users(): Nullable<User[]> | Promise<Nullable<User[]>>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class ISubscription {
    abstract message(): Nullable<Message> | Promise<Nullable<Message>>;
}

export class User {
    id: string;
    email: string;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    status: string;
    role: string;
    messages?: Nullable<Message[]>;
    confirmationToken?: Nullable<string>;
    resetToken?: Nullable<string>;
    createdAt: string;
    updatedAt: string;
}

type Nullable<T> = T | null;
