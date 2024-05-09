
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface SignInWithPasswordInput {
    email: string;
    password: string;
}

export interface RefreshTokenInput {
    token: string;
}

export interface FindPostByIdInput {
    id: string;
}

export interface CreatePostInput {
    title: string;
    description: string;
}

export interface CreateUserWithPasswordInput {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

export interface FindUserByEmailInput {
    email: string;
}

export interface FindUserByIdInput {
    id: string;
}

export interface AccessToken {
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface IMutation {
    signInWithPassword(signInWithPasswordInput: SignInWithPasswordInput): Nullable<AccessToken> | Promise<Nullable<AccessToken>>;
    refreshToken(refreshTokenInput: RefreshTokenInput): Nullable<AccessToken> | Promise<Nullable<AccessToken>>;
    createPost(createPostInput: CreatePostInput): Post | Promise<Post>;
    createUser(createUserWithPasswordInput: CreateUserWithPasswordInput): User | Promise<User>;
}

export interface IQuery {
    activeUser(): User | Promise<User>;
    findPosts(): Nullable<Post[]> | Promise<Nullable<Post[]>>;
    findPostById(findPostByIdInput: FindPostByIdInput): Nullable<Post> | Promise<Nullable<Post>>;
    findMePosts(): Nullable<Post[]> | Promise<Nullable<Post[]>>;
    findUsers(): Nullable<User[]> | Promise<Nullable<User[]>>;
    findUserByEmail(findUserByEmailInput: FindUserByEmailInput): Nullable<User> | Promise<Nullable<User>>;
    findUserById(findUserByIdInput: FindUserByIdInput): Nullable<User> | Promise<Nullable<User>>;
}

export interface Post {
    id: string;
    title: string;
    description: string;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}

export interface ISubscription {
    postCreated(): Post | Promise<Post>;
    userCreated(): User | Promise<User>;
}

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
}

type Nullable<T> = T | null;
