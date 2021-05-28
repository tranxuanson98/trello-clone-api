import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './activity.entity';
import { CreateActivityDto } from './dto/activity.dto';

@Injectable()
export class ActivityService {
    constructor(
        @InjectRepository(Activity)
        private activityRepository: Repository<Activity>,
    ) { }

    findAll(): Promise<Activity[]> {
        return this.activityRepository.find();
    }

    findOne(id: string): Promise<Activity> {
        return this.activityRepository.findOne(id);
    }

    async remove(id: string): Promise<Activity> {
        const activityToRemove = await this.activityRepository.findOne(id);
        return await this.activityRepository.remove(activityToRemove);
    }

    async create(activityDto: CreateActivityDto): Promise<Activity> {
        var createActivity = new Activity();
        createActivity.description = activityDto.description;
        createActivity.user = activityDto.user;
        return await this.activityRepository.save(createActivity);
    }

    async update(activityDto: CreateActivityDto): Promise<Activity> {
        var createActivity = new Activity();
        createActivity.id = activityDto.id;
        createActivity.description = activityDto.description;
        createActivity.user = activityDto.user;
        return await this.activityRepository.save(createActivity);
    }
}
