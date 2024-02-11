import { IsEmail, IsString, IsNotEmpty } from 'class-validator'

export class CreateAdminDto {
  @IsEmail()
  public email: string

  @IsString()
  @IsNotEmpty()
  public password: string
}
