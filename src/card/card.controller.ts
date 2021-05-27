import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Req, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { Card } from './card.entity';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/card.dto';

@Controller('card')
export class CardController {
    constructor(
        private readonly cardService: CardService,
        private jwtService: JwtService,
        private readonly userService: UserService,

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
    async createCard(@Body() createCardDto: CreateCardDto, @Req() request: Request): Promise<Card> {
        try {
            const cookie = request.cookies['jwt'];
            const data = await this.jwtService.verifyAsync(cookie);
            if (!data) {
                throw new UnauthorizedException();
            }
            const user = await this.userService.findOne({ id: data['id'] })
            createCardDto.user = user;
            delete createCardDto.user.password;
            return this.cardService.create(createCardDto);
        } catch (e) {
            throw new UnauthorizedException();
        }
        
    }

    @Put()
    async updateCard(@Body() createCardDto: CreateCardDto, @Req() request: Request): Promise<Card> {
        try {
            if(!createCardDto.id){
                throw new NotFoundException();
            }
            const cookie = request.cookies['jwt'];
            const data = await this.jwtService.verifyAsync(cookie);
            if (!data) {
                throw new UnauthorizedException();
            }
            const user = await this.userService.findOne({ id: data['id'] })
            createCardDto.user = user;
            delete createCardDto.user.password;
            return this.cardService.update(createCardDto);
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Delete(':id')
    deleteCard(@Param('id') id): Promise<Card> {
        return this.cardService.remove(id);
    }

}
