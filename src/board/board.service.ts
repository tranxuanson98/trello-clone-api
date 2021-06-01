import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from 'src/activity/activity.entity';
import { typeActivity } from 'src/objectActivity/dto/object-activity.dto';
import { ObjectActivity } from 'src/objectActivity/object-activity.entity';
import { Repository } from 'typeorm';
import { Board } from './Board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Board)
        private BoardRepository: Repository<Board>,

        @InjectRepository(Activity)
        private ActivityRepository: Repository<Activity>,

        @InjectRepository(ObjectActivity)
        private ObjectRepository: Repository<ObjectActivity>,
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
        const createBoard = new Board();
        createBoard.name = boardDto.name;
        createBoard.status = boardDto.status;
        createBoard.users = [boardDto.user];
        const savedBoard = await this.BoardRepository.save(createBoard);
        const createOb = new ObjectActivity();
        createOb.typeActivity = typeActivity.board;
        createOb.typeId = savedBoard.id;
        const savedObj = await this.ObjectRepository.save(createOb);
        const createActivity = new Activity();
        createActivity.objectActivity = savedObj;
        createActivity.user = boardDto.user;
        await this.ActivityRepository.save(createActivity);
        return savedBoard;
    }

    async update(boardDto: CreateBoardDto): Promise<Board> {
        const createBoard = new Board();
        createBoard.id = boardDto.id;
        createBoard.name = boardDto.name;
        createBoard.status = boardDto.status;
        createBoard.users = [boardDto.user];
        return await this.BoardRepository.save(createBoard);
    }
}
