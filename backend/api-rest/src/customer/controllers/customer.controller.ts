import { Controller, Get, Post, Body, Put, Param, Delete, Inject, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CUSTOMER_MICROSERVICE } from 'src/config';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { PaginationDto } from 'src/common';

@Controller('customer')
export class CustomerController {
  constructor(@Inject(CUSTOMER_MICROSERVICE) private readonly client: ClientProxy) {}

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.client.send({ cmd: 'find_all_customers' }, {});
  }

  @Get('balance/:document/:phone')
  findOne(
    @Param('document') document: string,
    @Param('phone') phone: string,
  ) {
    return this.client.send({ cmd: 'check_balance' }, { document, phone });
  }

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.client.send({ cmd: 'create_customer' }, createCustomerDto);
  }

  @Post('add-funds')
  update(@Body() updateCustomerDto: UpdateCustomerDto) {
    return this.client.send({ cmd: 'add_funds' }, updateCustomerDto);
  }
}
