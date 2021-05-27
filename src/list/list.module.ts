import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './list.entity';
import { Board } from 'src/board/board.entity';
import { User } from 'src/user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([List,Board,User]),
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '1d' }
        })
    ],
    providers: [ListService,UserService],
    controllers: [ListController]
})
export class ListModule { }
