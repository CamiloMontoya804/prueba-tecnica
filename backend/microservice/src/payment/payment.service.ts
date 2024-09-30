import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { Status, Type } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomerService } from 'src/customer/customer.service';
import { MailService } from 'src/mail/mail.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';
import { generateAlphanumericToken } from 'src/utils/utils';

@Injectable()
export class PaymentService {

  constructor(
    private prisma: PrismaService,
    private customerService: CustomerService,
    private mailService: MailService,
  ) {}

  async createPayment(createPaymentDto: CreatePaymentDto) {
    const { document, phone, amount } = createPaymentDto;
    const { id, balance, payments, email } = await this.customerService.findCustomer({ document, phone })
    const pendingAmount = payments.reduce((total, payment) => {
      if (payment.status === Status.PENDING) {
        return total + payment.amount;
      }
      return total;
    }, 0);
    const newBalance = balance - (pendingAmount + amount);

    if (newBalance < 0) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        title: 'ERROR',
        message: 'No tiene fondos suficientes para realizar el pago.',
      });
    }

    const token = generateAlphanumericToken();
    const code = generateAlphanumericToken(10);
    
    await this.prisma.payment.create({
      data: {
        code: code,
        token: token,
        amount: amount,
        type: Type.payment,
        customerId: id,
      },
    });

    return this.mailService.sendPayConfirmationEmail(email, `http://localhost:3000/pay/confirm/${token}`);
  }

  async addFunds(addFunds: CreatePaymentDto) {
    const { document, phone, amount } = addFunds;
    const { id: customerId, balance } = await this.customerService.findCustomer({ document, phone })
    const newBalance = balance + amount;

    const token = generateAlphanumericToken();
    const code = generateAlphanumericToken(10);
    
    await this.prisma.payment.create({
      data: {
        code: code,
        token: token,
        amount: amount,
        type: Type.recharge,
        status: Status.SUCCESS,
        customerId: customerId,
      },
    });

    return await this.customerService.updateBalance(customerId, newBalance)
  }

  async confirmPayment(confirmPaymentDto: ConfirmPaymentDto) {
    const { token } = confirmPaymentDto;
    const { id: paymentId, customer, amount } = await this.findPayment(token);

    let { id: customerId, balance } = customer;
    const newBalance = balance - amount;

    return this.customerService.updateBalance(customerId, newBalance);
  }

  async findPayment(token: string) {
    const payment = await this.prisma.payment.findFirstOrThrow({
      where: {
        status: Status.PENDING,
        token: token
      },
      select: {
        id: true,
        amount: true,
        customer: true,
      }
    });

    if ( !payment ) {
      throw new RpcException({
        status: HttpStatus.UNAUTHORIZED,
        title: 'ERROR',
        message: `Payment not found`,
      })
    }

    return payment;
  }
}
