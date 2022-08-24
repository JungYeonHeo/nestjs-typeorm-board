import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { BoardsResolver } from './boards.resolver';
import { BoardsService } from './boards.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardRepository])
  ],
  providers: [BoardsService, BoardsResolver],
})
export class BoardsModule {}
