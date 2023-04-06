import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
export class CreateUserDto {
  username: string;
  password: string;

  @IsOptional()
  firstName: string;
  @IsOptional()
  lastName: string;
}
