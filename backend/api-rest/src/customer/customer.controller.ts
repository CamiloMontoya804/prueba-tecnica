import { Controller, Get, Post, Body, Put, Param, Delete, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CUSTOMER_MICROSERVICE } from 'src/config';

@Controller('customer')
export class CustomerController {
  constructor(@Inject(CUSTOMER_MICROSERVICE) private readonly client: ClientProxy) {}

  @Get()
  findAll() {
    return this.client.send({ cmd: 'find_all_customers' }, {});
  }
}
