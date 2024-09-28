import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { CUSTOMER_MICROSERVICE, envs } from 'src/config';
import { CustomerController } from './customer.controller';

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
  controllers: [CustomerController],
})
export class CustomerModule {}
