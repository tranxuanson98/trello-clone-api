import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Board } from './board.entity';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('board')
export class BoardController {
    constructor(
        private readonly boardService: BoardService
    ) {

    }

    @Get()
    async findAll(): Promise<Board[]> {
        return this.boardService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id): Promise<Board> {
        return this.boardService.findOne(id);
    }

    @Post()
    createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardService.create(createBoardDto);
    }

    @Delete(':id')
    deleteBoard(@Param('id') id): Promise<Board> {
        return this.boardService.remove(id);
    }

    @Put()
    update(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardService.update(createBoardDto);
    }
}
