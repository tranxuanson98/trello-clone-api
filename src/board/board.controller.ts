import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Req, UnauthorizedException } from '@nestjs/common';
import { Board } from './board.entity';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Controller('board')
export class BoardController {
    constructor(
        private readonly boardService: BoardService,
        private jwtService: JwtService,
        private readonly userService: UserService,
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
    async createBoard(@Body() createBoardDto: CreateBoardDto, @Req() request: Request): Promise<Board> {
        try {
            const cookie = request.cookies['jwt'];
            const data = await this.jwtService.verifyAsync(cookie);
            if (!data) {
                throw new UnauthorizedException();
            }
            const user = await this.userService.findOne({ id: data['id'] })
            createBoardDto.user = user;
            delete createBoardDto.user.password;
            return this.boardService.create(createBoardDto);
        }catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Delete(':id')
    deleteBoard(@Param('id') id): Promise<Board> {
        return this.boardService.remove(id);
    }

    @Put()
    async update(@Body() createBoardDto: CreateBoardDto, @Req() request: Request): Promise<Board> {
        try {
            if(!createBoardDto.id){
                throw new NotFoundException();
            }
            const cookie = request.cookies['jwt'];
            const data = await this.jwtService.verifyAsync(cookie);
            if (!data) {
                throw new UnauthorizedException();
            }
            const user = await this.userService.findOne({ id: data['id'] })
            createBoardDto.user = user;
            delete createBoardDto.user.password;
            return this.boardService.update(createBoardDto);
        }catch (e) {
            throw new UnauthorizedException();
        }
    }
}
