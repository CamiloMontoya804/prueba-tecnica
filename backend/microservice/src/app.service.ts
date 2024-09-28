import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { PaginationDto } from 'src/common';

@Injectable()
export class AppService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('CustomerService');
  
  onModuleInit() {
    this.$connect();
    this.logger.log('Database connected')
  }

  async findAll ( paginationDto: PaginationDto ) {
    return await this.customer.findMany();
  }
}
