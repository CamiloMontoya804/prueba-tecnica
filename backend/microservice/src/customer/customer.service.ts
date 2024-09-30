import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { PaginationDto } from 'src/common';
import { QueryDto } from 'src/common/dto/query.dto';

@Injectable()
export class CustomerService {

  constructor(
    private prisma: PrismaService,
  ) {}

  async findAll ( paginationDto: PaginationDto ) {
    const { page, limit } = paginationDto;

    const totalPages = await this.prisma.customer.count();
    const lastPage = Math.ceil( totalPages / limit );

    return {
      data: await this.prisma.customer.findMany({
        select: {
          id: true,
          name: true,
          phone: true,
          email: true,
        },
        skip: ( page - 1 ) * limit,
        take: limit,
      }),
      meta: {
        total: totalPages,
        page: page,
        lastPage: lastPage,
      }
    }
  }

  async checkBalance( query: QueryDto ) {
    const { balance, payments } = await this.findCustomer(query);
    
    return { balance, payments };
  }

  create(createCustomerDto: CreateCustomerDto) {
    return this.prisma.customer.create({
      data: createCustomerDto,
      select: {
        document: true,
        name: true,
        phone: true,
        email: true,
      }
    });
  }

  async findCustomer(query: QueryDto) {
    const { document, phone } = query;

    const customer = await this.prisma.customer.findFirst({
      where: {
        document: document,
        phone: phone
      },
      select: {
        id: true,
        balance: true,
        payments: true,
        email: true,
      }
    });

    if ( !customer ) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        title: 'ERROR',
        message: `Customer not found`,
      })
    }

    return customer;
  }

  async updateBalance(customerId: string, newBalance: number) {
    await this.prisma.customer.update({
      where: {
        id: customerId,
      },
      data: {
        balance: newBalance,
      }
    });
  }
}
