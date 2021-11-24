import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../domain/user.entity';
import { UserDTO } from './dto/user.dto';
import { UserMapper } from './mapper/user.mapper';
import { UserRepository } from '../repository/user.repository';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { transformPassword } from '../security';
import {PetRepository} from "../repository/pet.repository";

@Injectable()
export class StoreService {
    constructor(@InjectRepository(PetRepository) private petRepository: PetRepository) {}

}
