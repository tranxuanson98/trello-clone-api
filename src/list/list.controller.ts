import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Req, UnauthorizedException } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { List } from './list.entity';
import { ListService } from './list.service';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Controller('list')
export class ListController {
    constructor(
        private readonly listService: ListService,
        private jwtService: JwtService,
        private readonly userService: UserService,
    ) {

    }

    @Get()
    async findAll(): Promise<List[]> {
        return this.listService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id): Promise<List> {
        return this.listService.findOne(id);
    }

    @Post()
    async createList(@Body() createListDto: CreateListDto, @Req() request: Request): Promise<List> {
        try {
            const cookie = request.cookies['jwt'];
            const data = await this.jwtService.verifyAsync(cookie);
            if (!data) {
                throw new UnauthorizedException();
            }
            const user = await this.userService.findOne({ id: data['id'] })
            createListDto.user = user;
            delete createListDto.user.password;
            return this.listService.create(createListDto);
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Put()
    async updateList(@Body() createListDto: CreateListDto, @Req() request: Request): Promise<List> {
        try {
            if(!createListDto.id){
                throw new NotFoundException();
            }
            const cookie = request.cookies['jwt'];
            const data = await this.jwtService.verifyAsync(cookie);
            if (!data) {
                throw new UnauthorizedException();
            }
            const user = await this.userService.findOne({ id: data['id'] })
            createListDto.user = user;
            delete createListDto.user.password;
            return this.listService.update(createListDto);
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Delete(':id')
    deleteList(@Param('id') id): Promise<List> {
        return this.listService.remove(id);
    }

}
