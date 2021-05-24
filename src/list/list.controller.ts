import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { List } from './list.entity';
import { ListService } from './list.service';

@Controller('list')
export class ListController {
    constructor(
        private readonly listService: ListService
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
    createList(@Body() createListDto: CreateListDto): Promise<List> {
        return this.listService.create(createListDto);
    }

    @Put()
    updateList(@Body() createListDto: CreateListDto): Promise<List> {
        return this.listService.update(createListDto);
    }

    @Delete(':id')
    deleteList(@Param('id') id): Promise<List> {
        return this.listService.remove(id);
    }

}
