export class UserRole {
  constructor(readonly value: 'user' | 'admin') {}

  equals(userRole: UserRole): boolean {
    return this.value === userRole.value;
  }

  isAdmin(): boolean {
    return this.value === 'admin';
  }

  isUser(): boolean {
    return this.value === 'user';
  }
}
