import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './list.entity';
import { Board } from 'src/board/board.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([List]),
        TypeOrmModule.forFeature([Board])
    ],
    providers: [ListService],
    controllers: [ListController]
})
export class ListModule { }
