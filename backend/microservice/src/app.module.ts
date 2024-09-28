import { Module } from '@nestjs/common';

import { CustomerModule } from './customer/customer.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [CustomerModule, PaymentModule],
})
export class AppModule {}
