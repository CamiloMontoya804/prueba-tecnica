import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  document: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  @IsString()
  @Length(10, 50)
  phone: string; 
}
