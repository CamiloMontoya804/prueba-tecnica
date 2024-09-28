import { IsNotEmpty, IsNumber, IsPositive, IsString, Length } from "class-validator";

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsString()
  document: string;
  
  @IsNotEmpty()
  @IsString()
  @Length(10, 50)
  phone: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  amount: number;
}
