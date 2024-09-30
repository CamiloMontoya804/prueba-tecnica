import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {

  async sendPayConfirmationEmail(email: string, url: string) {
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
        <p>Por favor confirme su pago clickando en el siguiente <a href="${url}">link</a></p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);

      return {
        title: 'Exito',
        message: 'El pago fue realizado correctamente, por favor confirmela con el correo enviado.',
      }
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        title: 'ERROR',
        message: `Hubo un problema al enviar el correo: ${error}`,
      });
    }
  }
}