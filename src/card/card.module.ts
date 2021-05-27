import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from 'src/list/list.entity';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { CardController } from './card.controller';
import { Card } from './card.entity';
import { CardService } from './card.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Card,List,User]),
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '1d' }
        })
    ],
    controllers: [CardController],
    providers: [CardService,UserService],
})
export class CardModule {

}
