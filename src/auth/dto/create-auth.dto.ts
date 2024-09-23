import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  firstname: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  lastname: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @Length(6, 16)
  password: string;
}

export class LoginDto {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @Length(6, 16)
  password: string;
}
