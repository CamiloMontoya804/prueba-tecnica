import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AppService } from './app.service';
import { PaginationDto } from 'src/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'find_all_customers' })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.appService.findAll(paginationDto);
  }
}
