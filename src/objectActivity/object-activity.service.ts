import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateObjectActivityDto } from './dto/object-activity.dto';
import { ObjectActivity } from './object-activity.entity';

@Injectable()
export class ObjectActivityService {
    constructor(
        @InjectRepository(ObjectActivity)
        private objectActivityRepository: Repository<ObjectActivity>,
    ) { }

    findOne(id: string): Promise<ObjectActivity> {
        return this.objectActivityRepository.findOne(id);
    }

    async remove(id: string): Promise<ObjectActivity> {
        const objectActivityToRemove = await this.objectActivityRepository.findOne(id);
        return await this.objectActivityRepository.remove(objectActivityToRemove);
    }

    async create(objectActivityDto: CreateObjectActivityDto): Promise<ObjectActivity> {
        var createObjectActivity = new ObjectActivity();
        createObjectActivity.typeActivity = objectActivityDto.typeActivity;
        createObjectActivity.typeId = objectActivityDto.typeId;
        return await this.objectActivityRepository.save(createObjectActivity);
    }

    async update(objectActivityDto: CreateObjectActivityDto): Promise<ObjectActivity> {
        var createObjectActivity = new ObjectActivity();
        createObjectActivity.id = objectActivityDto.id;
        createObjectActivity.typeActivity = objectActivityDto.typeActivity;
        createObjectActivity.typeId = objectActivityDto.typeId;
        return await this.objectActivityRepository.save(createObjectActivity);
    }
}
