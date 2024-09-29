import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import * as nodemailer from 'nodemailer';

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
      return {
        title: 'ERROR',
        message: 'No tiene fondos suficientes para realizar el pago.',
      }
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

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'perproject2@gmail.com',
        pass: 'ndmipkhbxbndafwh',
      },
    });

    const mailOptions = {
      from: '"Epayco - Test" <perproject2@gmail.com>',
      to: email,
      subject: 'Confirmación de Pago',
      html: `
        <p>Su pago ha sido registrado exitosamente</p>
        <p>Por favor confirme su pago clickando en el siguiente <a href="http://localhost:3000/pay/confirm/${token}">link</a></p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);

      return {
        title: 'Exito',
        message: 'El pago fue realizado correctamente, por favor confirmela con el correo enviado.',
      }
    } catch (error) {
      throw new Error('Hubo un problema al enviar el correo: ' + error.message);
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

    let { id: customerId, balance } = customer;
    const newBalance = balance - amount;

    await this.prisma.customer.update({
      where: {
        id: customerId,
      },
      data: {
        balance: newBalance,
      }
    });

    return await this.prisma.payment.update({
      where: {
        id: paymentId,
      },
      data: {
        status: Status.SUCCESS,
      }
    });
  }
}
