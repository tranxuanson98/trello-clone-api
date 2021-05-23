import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './Board.entity';

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

    async create(board: Board): Promise<Board> {
        return await this.BoardRepository.save(board);
    }

    async update(board: Board): Promise<Board> {
        return await this.BoardRepository.save(board);
    }
}
