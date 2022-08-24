import { ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { Resolver, Query, Args, Int, ResolveField, Parent, Mutation } from '@nestjs/graphql';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Resolver(() => Board)
export class BoardsResolver {
  constructor(private readonly boardsService: BoardsService) {}

  @Mutation(() => Board)
  @UsePipes(ValidationPipe)
  createBoard(@Args('createBoardDto') createBoardDto: CreateBoardDto) {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Mutation(() => Board)
  updateBoardStatus(@Args('id', ParseIntPipe) id: number, @Args('status', BoardStatusValidationPipe) status: BoardStatus) {
    return this.boardsService.updateBoardStatus(id, status);
  }

  @Mutation(() => String)
  deleteBoard(@Args('id', ParseIntPipe) id: number) {
    return this.boardsService.deleteBoard(id);
  }

  @Query(() => Board, {name: 'board'})
  getBoardById(@Args('id', ParseIntPipe) id: number) {
    return this.boardsService.getBoardById(id);
  }

  @Query(() => [Board], {name: 'boards'})
  getAllBoard() {
    return this.boardsService.getAllBoards();
  }
}