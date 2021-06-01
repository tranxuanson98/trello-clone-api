import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from 'src/activity/activity.entity';
import { Card } from 'src/card/card.entity';
import { ObjectActivity } from 'src/objectActivity/object-activity.entity';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { CommentsController } from './comments.controller';
import { Comments } from './comments.entity';
import { CommentsService } from './comments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comments, User, Card, Activity, ObjectActivity]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' }
    })
  ],
  controllers: [CommentsController],
  providers: [CommentsService, UserService]
})
export class CommentsModule { }
