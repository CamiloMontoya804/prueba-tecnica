import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class QueryDto {
  @IsNotEmpty()
  @IsString()
  document: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 50)
  phone: string; 
}