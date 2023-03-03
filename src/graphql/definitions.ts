
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class LoginInput {
    email: string;
    password: string;
}

export class UserInput {
    email: string;
    password: string;
}

export class AuthorizationError {
    error: string;
}

export class LoginSuccessfull {
    accessToken: string;
    refreshToken: string;
}

export abstract class IMutation {
    abstract login(input: LoginInput): Nullable<LoginResult> | Promise<Nullable<LoginResult>>;

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

export abstract class IQuery {
    abstract twitterRecords(): Nullable<Nullable<TwitterRecord>[]> | Promise<Nullable<Nullable<TwitterRecord>[]>>;

    abstract users(): Nullable<Nullable<UserWithoutPassword>[]> | Promise<Nullable<Nullable<UserWithoutPassword>[]>>;

    abstract user(id: string): Nullable<UserWithoutPassword> | Promise<Nullable<UserWithoutPassword>>;
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

export type LoginResult = LoginSuccessfull | AuthorizationError;
type Nullable<T> = T | null;
