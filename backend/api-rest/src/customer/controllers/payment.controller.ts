import { Controller, Get, Post, Body, Put, Param, Delete, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CUSTOMER_MICROSERVICE } from 'src/config';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { ConfirmPaymentDto } from '../dto/confirm-payment.dto';


@Controller('payment')
export class PaymentController {
  constructor(@Inject(CUSTOMER_MICROSERVICE) private readonly client: ClientProxy) {}

  @Post('create')
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.client.send({ cmd: 'create_payment' }, createPaymentDto);
  }

  @Post('confirm')
  confirm(@Body() confirmPaymentDto: ConfirmPaymentDto) {
    return this.client.send({ cmd: 'create_payment' }, confirmPaymentDto);
  }
}
