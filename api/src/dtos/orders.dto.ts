import { IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator'

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  public product_id: string

  @IsNotEmpty()
  @IsString()
  public customer_id: string

  @IsNotEmpty()
  @IsNumber()
  public unit: number

  @IsNotEmpty()
  @IsNumber()
  public price: number

  @IsOptional()
  @IsNumber()
  public discount?: number
}
