import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { CUSTOMER_MICROSERVICE, envs } from 'src/config';
import { CustomerController } from './controllers/customer.controller';
import { PaymentController } from './controllers/payment.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: CUSTOMER_MICROSERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.customerMicroserviceHost,
          port: envs.customerMicroservicePort
        }
      }
    ])
  ],
  controllers: [CustomerController, PaymentController],
})
export class CustomerModule {}
