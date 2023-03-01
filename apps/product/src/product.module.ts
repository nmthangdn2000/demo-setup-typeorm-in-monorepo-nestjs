import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CoreModule } from '@app/core';

@Module({
  imports: [CoreModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
