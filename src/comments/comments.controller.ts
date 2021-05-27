import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Req, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { identity } from 'rxjs';
import { UserService } from 'src/user/user.service';
import { Comments } from './comments.entity';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/comments.dto';

@Controller('comments')
export class CommentsController {
    constructor(
        private readonly commentsService: CommentsService,
        private jwtService: JwtService,
        private readonly userService: UserService,

    ) {}

    @Get()
    async findAll(): Promise<Comments[]> {
        return this.commentsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id): Promise<Comments> {
        return this.commentsService.findOne(id);
    }

    @Delete(':id')
    deleteComment(@Param('id') id): Promise<Comments> {
        return this.commentsService.remove(id);
    }

    @Post()
    async createComment(@Body() createCommentDto: CreateCommentDto, @Req() request: Request): Promise<Comments> {
        try {
            const cookie = request.cookies['jwt'];
            const data = await this.jwtService.verifyAsync(cookie);
            if (!data) {
                throw new UnauthorizedException();
            }
            const user = await this.userService.findOne({ id: data['id'] })
            createCommentDto.user = user;
            delete createCommentDto.user.password;
            return this.commentsService.create(createCommentDto);
        } catch (e) {
            throw new UnauthorizedException();
        }
        
    }

    @Post()
    async updateComment(@Body() createCommentDto: CreateCommentDto, @Req() request: Request): Promise<Comments> {
        try {
            if(!createCommentDto.id) {
                throw new NotFoundException();
            }
            const cookie = request.cookies['jwt'];
            const data = await this.jwtService.verifyAsync(cookie);
            if (!data) {
                throw new UnauthorizedException();
            }
            const user = await this.userService.findOne({ id: data['id'] })
            createCommentDto.user = user;
            delete createCommentDto.user.password;
            return this.commentsService.update(createCommentDto);
        } catch (e) {
            throw new UnauthorizedException();
        }
    }
}
