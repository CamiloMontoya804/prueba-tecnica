import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsPositive, IsString, Length } from 'class-validator';

import { CreateCustomerDto } from './create-customer.dto';

export class AddFundsDto extends PartialType(CreateCustomerDto) {

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
