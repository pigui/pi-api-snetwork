import { UserRole } from './value-objects/user-role';

export abstract class User {
  constructor(
    public id: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public role: UserRole,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
