import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from 'src/list/list.entity';
import { Repository } from 'typeorm';
import { Card } from './card.entity';
import { CreateCardDto } from './dto/card.dto';

@Injectable()
export class CardService {
    constructor(
        @InjectRepository(Card)
        private cardRepository: Repository<Card>,

        @InjectRepository(List)
        private listRepository: Repository<List>,
    ){

    }

    findAll(): Promise<Card[]> {
        return this.cardRepository.find();
    }

    findOne(id: string): Promise<Card> {
        return this.cardRepository.findOne(id);
    }

    async remove(id: string): Promise<Card> {
        const cardToRemove = await this.cardRepository.findOne(id);
        return await this.cardRepository.remove(cardToRemove);
    }

    async create(cardDto: CreateCardDto): Promise<Card> {
        const createCard = new Card();
        createCard.name = cardDto.name;
        createCard.description = cardDto.description;
        createCard.date = cardDto.date;
        const data = await this.listRepository.findOne(cardDto.listId);
        createCard.list = data;
        return await this.cardRepository.save(createCard);
    }

    async update(cardDto: CreateCardDto): Promise<Card> {
        const updateCard = new Card();
        updateCard.id = cardDto.id;
        updateCard.name = cardDto.name;
        updateCard.description = cardDto.description;
        updateCard.date = cardDto.date;
        const data = await this.listRepository.findOne(cardDto.listId);
        updateCard.list = data;
        return await this.cardRepository.save(updateCard);
    }
}
