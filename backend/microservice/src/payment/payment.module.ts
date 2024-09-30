import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';
import { CustomerModule } from 'src/customer/customer.module';
import { MailModule } from 'src/mail/mail.module';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  imports: [PrismaModule, CustomerModule, MailModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
