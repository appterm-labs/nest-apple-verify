import { Module } from '@nestjs/common';
import { NestAppleVerifyService } from './nest-apple-verify.service';

@Module({
  providers: [NestAppleVerifyService],
  exports: [NestAppleVerifyService],
})
export class NestAppleVerifyModule {}
