
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class UsersInput {
    email: string;
    password: string;
}

export class ValidateEmailInput {
    token: string;
}

export class UserInput {
    email: string;
    password: string;
}

export class AuthSuccessfull {
    accessToken: string;
    refreshToken: string;
}

export class RegisterSuccessfull {
    message: string;
}

export class EmailValidationSuccessfull {
    mesage: string;
}

export class SignOutSuccessfull {
    message: string;
}

export abstract class IQuery {
    abstract signOut(): Nullable<SignOutSuccessfull> | Promise<Nullable<SignOutSuccessfull>>;

    abstract twitterRecords(): Nullable<Nullable<TwitterRecord>[]> | Promise<Nullable<Nullable<TwitterRecord>[]>>;

    abstract users(): Nullable<Nullable<UserWithoutPassword>[]> | Promise<Nullable<Nullable<UserWithoutPassword>[]>>;

    abstract user(id: string): Nullable<UserWithoutPassword> | Promise<Nullable<UserWithoutPassword>>;
}

export abstract class IMutation {
    abstract login(input: UsersInput): Nullable<AuthSuccessfull> | Promise<Nullable<AuthSuccessfull>>;

    abstract register(input?: Nullable<UsersInput>): Nullable<RegisterSuccessfull> | Promise<Nullable<RegisterSuccessfull>>;

    abstract validateEmail(input?: Nullable<ValidateEmailInput>): Nullable<AuthSuccessfull> | Promise<Nullable<AuthSuccessfull>>;

    abstract createUser(input: UserInput): Nullable<UserWithoutPassword> | Promise<Nullable<UserWithoutPassword>>;
}

export class TwitterRecord {
    id: string;
    auhtorID: string;
    author: User;
    isComment: boolean;
    parentRecordId?: Nullable<string>;
    parentRecord?: Nullable<TwitterRecord>;
    childrenRecords: Nullable<TwitterRecord>[];
    text: string;
    createdAt: string;
    updatedAt: string;
}

export class User {
    id: string;
    email: string;
    password: string;
    records: TwitterRecord[];
}

export class UserWithoutPassword {
    id: string;
    email: string;
    records: TwitterRecord[];
}

type Nullable<T> = T | null;
