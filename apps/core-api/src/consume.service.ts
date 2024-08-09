import { Injectable } from '@nestjs/common';

@Injectable()
export class ConsumeService {
  constructor(global: string) {
    console.log(global);
  }
}
