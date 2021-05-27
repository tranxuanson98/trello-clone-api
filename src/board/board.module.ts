import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { User } from 'src/user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Board, User]),
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '1d' }
        })
    ],
    controllers: [BoardController],
    providers: [BoardService, UserService],
})
export class BoardModule {
}
