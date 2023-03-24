import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import Public from './config/publicRouteMetadata.config';

@ApiTags('health')
@Controller('/health')
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}
  @Public()
  
  @Get()
  @Public()
  @ApiOperation({ 
    summary: 'Return data of environment in console',
    description: 'Return data of environment in console',
  })
  getHello() {
    return this.appService.getHello();
  }
}
