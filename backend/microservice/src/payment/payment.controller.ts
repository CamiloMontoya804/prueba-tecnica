import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern({ cmd: 'create_payment' })
  createPayment(@Payload() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.createPayment(createPaymentDto);
  }

  @MessagePattern({ cmd: 'confirm_payment' })
  confirmPayment(@Payload() confirmPaymentDto: ConfirmPaymentDto) {
    return this.paymentService.confirmPayment(confirmPaymentDto);
  }

  @MessagePattern({ cmd: 'add_funds' })
  addFunds(@Payload() addFundsDto: CreatePaymentDto) {
    return this.paymentService.addFunds(addFundsDto);
  }
}
