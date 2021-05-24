import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Card } from './card.entity';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/card.dto';

@Controller('card')
export class CardController {
    constructor(
        private readonly cardService: CardService
    ) {

    }

    @Get()
    async findAll(): Promise<Card[]> {
        return this.cardService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id): Promise<Card> {
        return this.cardService.findOne(id);
    }

    @Post()
    createCard(@Body() createCardDto: CreateCardDto): Promise<Card> {
        return this.cardService.create(createCardDto);
    }

    @Put()
    updateCard(@Body() createCardDto: CreateCardDto): Promise<Card> {
        return this.cardService.update(createCardDto);
    }

    @Delete(':id')
    deleteCard(@Param('id') id): Promise<Card> {
        return this.cardService.remove(id);
    }

}
