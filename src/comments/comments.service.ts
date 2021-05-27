import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from 'src/card/card.entity';
import { Repository } from 'typeorm';
import { Comments } from './comments.entity';
import { CreateCommentDto } from './dto/comments.dto'

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comments)
        private commentsRepository: Repository<Comments>,

        @InjectRepository(Card)
        private cardRepository: Repository<Card>,
    ) {

    }
    
    findAll(): Promise<Comments[]> {
        return this.commentsRepository.find();
    }

    findOne(id: string): Promise<Comments> {
        return this.commentsRepository.findOne(id);
    }

    async remove(id: string): Promise<Comments> {
        const commentToRemove = await this.commentsRepository.findOne(id);
        return await this.commentsRepository.remove(commentToRemove);
    }

    async create(commentDto: CreateCommentDto): Promise<Comments> {
        const createComment = new Comments();
        createComment.content = commentDto.content;
        createComment.date = commentDto.date;
        const data = await this.cardRepository.findOne(commentDto.cardId);
        createComment.card = data;
        createComment.users = [commentDto.user];
        return await this.cardRepository.save(createComment);
    }

    async update(commentDto: CreateCommentDto): Promise<Comments> {
        const updateComment = new Comments();
        updateComment.id = commentDto.id;
        updateComment.content = commentDto.content;
        updateComment.date = commentDto.date;
        const data = await this.cardRepository.findOne(commentDto.cardId);
        updateComment.card = data;
        updateComment.users = [commentDto.user];
        return await this.cardRepository.save(updateComment);
    }
}
