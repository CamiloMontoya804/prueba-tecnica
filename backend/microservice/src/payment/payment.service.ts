import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { Status } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';
import { generateAlphanumericToken } from 'src/utils/utils';

@Injectable()
export class PaymentService {

  constructor(
    private prisma: PrismaService,
  ) {}

  async createPayment(createPaymentDto: CreatePaymentDto) {
    const { document, phone, amount } = createPaymentDto;
    const { id, balance, payments, email } = await this.prisma.customer.findFirstOrThrow({
      where: {
        document: document,
        phone: phone
      },
      select: {
        id: true,
        email: true,
        balance: true,
        payments: true,
      }
    });
    const pendingAmount = payments.reduce((total, payment) => {
      if (payment.status === Status.PENDING) {
        return total + payment.amount;
      }
      return total;
    }, 0);
    const newBalance = balance - (pendingAmount + amount);

    if (newBalance < 0) {
      throw new RpcException({
        message: `Have no funds to do the payment`,
      });
    }

    const token = generateAlphanumericToken();
    const code = generateAlphanumericToken(10);
    
    await this.prisma.payment.create({
      data: {
        code: code,
        token: token,
        amount: amount,
        customerId: id,
      },
    });

    return {
      code: code,
      token: token,
      email: email,
      customerId: id,
    }
  }

  async confirmPayment(confirmPaymentDto: ConfirmPaymentDto) {
    const { token } = confirmPaymentDto;
    const { id: paymentId, customer, amount } = await this.prisma.payment.findFirstOrThrow({
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

    await this.prisma.payment.update({
      where: {
        id: paymentId,
      },
      data: {
        status: Status.SUCCESS,
      }
    });

    let { id: customerId, balance } = customer;
    const newBalance = balance - amount;

    return await this.prisma.customer.update({
      where: {
        id: customerId,
      },
      data: {
        balance: newBalance,
      }
    });

  }
}
