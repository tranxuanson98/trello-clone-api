import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './Board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Board)
        private BoardRepository: Repository<Board>,

    ) { }

    findAll(): Promise<Board[]> {
        return this.BoardRepository.find();
    }

    findOne(id: string): Promise<Board> {
        return this.BoardRepository.findOne(id);
    }

    async remove(id: string): Promise<Board> {
        const boardToRemove = await this.BoardRepository.findOne(id);
        return await this.BoardRepository.remove(boardToRemove);
    }

    async create(boardDto: CreateBoardDto): Promise<Board> {
        var createBoard = new Board();
        createBoard.id = boardDto.id;
        createBoard.name = boardDto.name;
        createBoard.status = boardDto.status;
        createBoard.users = [boardDto.user];
        return await this.BoardRepository.save(createBoard);
    }

    async update(boardDto: CreateBoardDto): Promise<Board> {
        var createBoard = new Board();
        createBoard.id = boardDto.id;
        createBoard.name = boardDto.name;
        createBoard.status = boardDto.status;
        createBoard.users = [boardDto.user];
        return await this.BoardRepository.save(createBoard);
    }
}
