import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from 'src/list/list.entity';
import { CardController } from './card.controller';
import { Card } from './card.entity';
import { CardService } from './card.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Card]),
        TypeOrmModule.forFeature([List])
    ],
    controllers: [CardController],
    providers: [CardService],
})
export class CardModule {

}
