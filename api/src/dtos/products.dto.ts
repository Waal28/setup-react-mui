import { IsNumber, IsString, IsNotEmpty } from 'class-validator'

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  public name: string

  @IsNotEmpty()
  @IsNumber()
  public unit: number

  @IsNotEmpty()
  @IsNumber()
  public price: number
}
