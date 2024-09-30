import { Controller, Get, Post, Body, Param, Inject, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

import { CUSTOMER_MICROSERVICE } from 'src/config';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { PaginationDto } from 'src/common';
import { catchError } from 'rxjs';

@ApiTags('Customer')
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
    return this.client.send({ cmd: 'check_balance' }, { document, phone })
      .pipe(
        catchError( err => { throw new RpcException(err) })
      )
  }

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.client.send({ cmd: 'create_customer' }, createCustomerDto);
  }
}
