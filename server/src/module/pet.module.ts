import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {PetRepository} from "../repository/pet.repository";
import {PetController} from "../web/rest/pet.controller";
import {PetService} from "../service/pet.service";
import {TagRepository} from "../repository/tag.repository";
import {CategoryRepository} from "../repository/category.repository";
import {StoreController} from "../web/rest/store.controller";
import {OrderRepository} from "../repository/order.repository";

@Module({
    imports: [TypeOrmModule.forFeature([PetRepository]),TypeOrmModule.forFeature([CategoryRepository]),TypeOrmModule.forFeature([TagRepository]),TypeOrmModule.forFeature([OrderRepository])],
    controllers: [PetController,StoreController],
    providers: [PetService],
    exports: [PetService],
})
export class PetModule {}
