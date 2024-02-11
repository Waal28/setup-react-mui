import { IsEmail, IsString, IsNotEmpty } from 'class-validator'

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  public name: string

  @IsNotEmpty()
  public phone: string

  @IsNotEmpty()
  @IsEmail()
  public email: string

  @IsString()
  @IsNotEmpty()
  public address: string
}
