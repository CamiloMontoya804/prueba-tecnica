import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PaginationDto } from 'src/common';
import { QueryDto } from 'src/common/dto/query.dto';

@Controller()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @MessagePattern({ cmd: 'find_all_customers' })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.customerService.findAll(paginationDto);
  }

  @MessagePattern({ cmd: 'check_balance' })
  checkBalance(@Payload() query: QueryDto) {
    return this.customerService.checkBalance(query);
  }

  @MessagePattern({ cmd: 'create_customer' })
  create(@Payload() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @MessagePattern({ cmd: 'add_funds' })
  addFunds(@Payload() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.addFunds(updateCustomerDto);
  }
}
