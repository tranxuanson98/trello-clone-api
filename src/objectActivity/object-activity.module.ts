import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObjectActivityController } from './object-activity.controller';
import { ObjectActivity } from './object-activity.entity';
import { ObjectActivityService } from './object-activity.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ObjectActivity]),
    ],
    controllers: [ObjectActivityController],
    providers: [ObjectActivityService],
    exports: [ObjectActivityService]
})
export class ObjectActivityModule {

}
