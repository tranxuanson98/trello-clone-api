import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Board } from 'src/board/board.entity';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreateListDto } from './dto/create-list.dto';
import { List } from './list.entity';

@Injectable()
export class ListService {

    constructor(
        @InjectRepository(List)
        private listRepository: Repository<List>,

        @InjectRepository(Board)
        private boardRepository: Repository<Board>,

    ) { }

    findAll(): Promise<List[]> {
        return this.listRepository.find();
    }

    findOne(id: string): Promise<List> {
        return this.listRepository.findOne(id);
    }

    async remove(id: string): Promise<List> {
        const listToRemove = await this.listRepository.findOne(id);
        return await this.listRepository.remove(listToRemove);
    }

    async create(listDto: CreateListDto): Promise<List> {
        const createList = new List();
        createList.name = listDto.name;
        const boardOfList = await this.boardRepository.findOne(listDto.boardId);
        createList.board = boardOfList;        
        createList.users = [listDto.user];
        return await this.listRepository.save(createList);
    }

    async update(listDto: CreateListDto): Promise<List> {
        var updateList = new List();
        updateList.id = listDto.id;
        updateList.name = listDto.name;
        const data = await this.boardRepository.findOne(listDto.boardId);
        updateList.board = data;
        updateList.users = [listDto.user];
        return await this.listRepository.save(updateList);
    }
}
