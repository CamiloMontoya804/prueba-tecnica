import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
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
    const { document, phone } = query;
    return await this.prisma.customer.findFirstOrThrow({
      where: {
        document: document,
        phone: phone
      },
      select: {
        id: true,
        name: true,
        phone: true,
        balance: true,
        payments: true,
      }
    });
  }

  create(createCustomerDto: CreateCustomerDto) {
    return this.prisma.customer.create({
      data: createCustomerDto,
    });
  }

  async addFunds( updateCustomerDto: UpdateCustomerDto ) {
    const { document, phone, amount } = updateCustomerDto;
    const { id, balance } = await this.prisma.customer.findFirstOrThrow({
      where: {
        document: document,
        phone: phone
      },
      select: {
        id: true,
        balance: true,
      }
    });
    const newBalance = balance + amount;

    return await this.prisma.customer.update({
      where: {
        id: id
      },
      data: {
        balance: newBalance,
      }
    });
  }
}
