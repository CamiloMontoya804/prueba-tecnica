import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';

import { CUSTOMER_MICROSERVICE } from 'src/config';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { ConfirmPaymentDto } from '../dto/confirm-payment.dto';
import { AddFundsDto } from '../dto/add-funds.dto';

@ApiTags('Payment')
@Controller('pay')
export class PaymentController {
  constructor(@Inject(CUSTOMER_MICROSERVICE) private readonly client: ClientProxy) {}

  @Post('add-funds')
  addFunds(@Body() addFundsDto: AddFundsDto) {
    return this.client.send({ cmd: 'add_funds' }, addFundsDto)
      .pipe(
        catchError( err => { throw new RpcException(err) })
      );
  }

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.client.send({ cmd: 'create_payment' }, createPaymentDto)
      .pipe(
        catchError( err => { throw new RpcException(err) })
      );
  }

  @Post('confirm')
  confirm(@Body() confirmPaymentDto: ConfirmPaymentDto) {
    return this.client.send({ cmd: 'confirm_payment' }, confirmPaymentDto)
      .pipe(
        catchError( err => { throw new RpcException(err) })
      );
  }
}
