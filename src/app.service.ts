import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { name, version } from '@root/package.json'
@Injectable()
export class AppService {
  getHello() {
    return {
      working: true,
      api: {
        name, version
      }
    };
  }
}
