import { Body, Controller, Get, NotFoundException, Param, Post, Put, Req, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { Activity } from './activity.entity';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/activity.dto';

@Controller('activity')
export class ActivityController {
    constructor(
        private readonly activityService: ActivityService,
        private jwtService: JwtService,
        private readonly userService: UserService,
    ) { }

    @Get()
    async findAll(): Promise<Activity[]> {
        return this.activityService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id): Promise<Activity> {
        return this.activityService.findOne(id);
    }

    @Post()
    async createActivity(@Body() createActivitydDto: CreateActivityDto, @Req() request: Request): Promise<Activity> {
        try {
            const cookie = request.cookies['jwt'];
            const data = await this.jwtService.verifyAsync(cookie);
            if (!data) {
                throw new UnauthorizedException();
            }
            const user = await this.userService.findOne({ id: data['id'] })
            createActivitydDto.user = user;
            delete createActivitydDto.user.password;
            return this.activityService.create(createActivitydDto);
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Put()
    async updateActivity(@Body() createActivitydDto: CreateActivityDto, @Req() request: Request): Promise<Activity> {
        try {
            if (!createActivitydDto.id) {
                throw new NotFoundException();
            }
            const cookie = request.cookies['jwt'];
            const data = await this.jwtService.verifyAsync(cookie);
            if (!data) {
                throw new UnauthorizedException();
            }
            const user = await this.userService.findOne({ id: data['id'] })
            createActivitydDto.user = user;
            delete createActivitydDto.user.password;
            return this.activityService.update(createActivitydDto);
        } catch (e) {
            throw new UnauthorizedException();
        }
    }
}
