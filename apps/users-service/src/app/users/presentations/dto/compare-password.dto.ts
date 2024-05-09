import { User } from '../../application/entities/user';

export class ComparePasswordDto {
  user: User;
  password: string;
}
