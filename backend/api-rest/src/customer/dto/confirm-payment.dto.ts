import { IsNotEmpty, IsString, Length } from "class-validator";

export class ConfirmPaymentDto {
  @IsNotEmpty()
  @IsString()
  @Length(6)
  token: string;
}
