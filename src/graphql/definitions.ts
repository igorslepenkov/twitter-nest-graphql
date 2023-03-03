
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class UserInput {
    email: string;
    password: string;
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

    abstract users(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export class User {
    id: string;
    email: string;
    password: string;
    records: TwitterRecord[];
}

export abstract class IMutation {
    abstract createUser(input: UserInput): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
