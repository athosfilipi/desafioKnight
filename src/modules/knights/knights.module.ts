import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Knight, KnightSchema, KNIGHT_MODEL_NAME } from './entities/knight.Schema';
import { KnightsController } from './knights.controller';
import { KnightsService } from './knights.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: KNIGHT_MODEL_NAME, schema: KnightSchema }])
  ],
  controllers: [KnightsController],
  providers: [KnightsService],
  exports: [KnightsService]
})
export class KnightsModule {}