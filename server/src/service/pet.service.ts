import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {PetRepository} from "../repository/pet.repository";
import {PetDto} from "./dto/pet.dto";
import {PetMapper} from "./mapper/pet.mapper";
import {Pet} from "../domain/pet.entity";
import {TagRepository} from "../repository/tag.repository";
import {CategoryRepository} from "../repository/category.repository";
import {options} from "tsconfig-paths/lib/options";
import {UserDTO} from "./dto/user.dto";
import {DeleteResult} from "typeorm";
import {OrderRepository} from "../repository/order.repository";
import {OrderDto} from "./dto/order.dto";
import {OrderMapper} from "./mapper/order.mapper";
import {Order} from "../domain/order.entity";

@Injectable()
export class PetService {
    constructor(@InjectRepository(PetRepository) private petRepository: PetRepository,
                @InjectRepository(TagRepository) private tagRepository: TagRepository,
                @InjectRepository(CategoryRepository) private categoryRepository: CategoryRepository,
                @InjectRepository(OrderRepository) private orderRepository: OrderRepository
                ) {}


    async findById(id: number): Promise<PetDto | undefined> {
        const result = await this.petRepository.findOne(id);
        return this.convertInFull(result);
    }

    async update(petDTO: PetDto, updater?: string): Promise<PetDto | undefined> {
      const updatedResult = await this.petRepository.update(petDTO.id,PetMapper.fromDTOtoEntity(petDTO));
      console.log(updatedResult);

      return await this.findById(petDTO.id);
    }


  async delete(petId:number): Promise<DeleteResult | undefined> {
    return await this.petRepository.delete(petId);
  }


    async save(petDTO: PetDto, creator?: string): Promise<PetDto | undefined> {
        // const user = this.convertInAuthorities(UserMapper.fromDTOtoEntity(userDTO));
        // if (updatePassword) {
        //     await transformPassword(user);
        // }
        // if (creator) {
        //     if (!user.createdBy) {
        //         user.createdBy = creator;
        //     }
        //     user.lastModifiedBy = creator;
        // }
        // const result = await this.userRepository.save(user);
        // return UserMapper.fromEntityToDTO(this.flatAuthorities(result));
      const pet = PetMapper.fromDTOtoEntity(petDTO);
      const result = await this.petRepository.save(pet,{});
      return this.convertInFull(result);
    }


  async getCount(): Promise<Number | undefined> {
   return await this.petRepository.count();
  }

  async placeOrder(orderDto: OrderDto, creator?: string): Promise<OrderDto | undefined> {
    const order = OrderMapper.fromDTOtoEntity(orderDto);
    const result = await this.orderRepository.save(order,{});
    return this.convertOrderToDto(result);
  }
  async deleteOrder(orderId:number): Promise<DeleteResult | undefined> {
    const result = await this.orderRepository.delete(orderId);
    return result;
  }


  async getOrderById(orderId:number): Promise<OrderDto | undefined> {
    const result = await this.orderRepository.findOne(orderId);
    return this.convertOrderToDto(result);
  }

  private async convertOrderToDto(order: Order): Promise<OrderDto | undefined> {
      const orderDto = OrderMapper.fromEntityToDTO(order);
      if(order.petId!=null){
        const pet = await this.findById(order.petId);
        orderDto.pet = pet;
      }

      return orderDto;
  }


  private async convertInFull(pet: Pet): Promise<PetDto | undefined> {
      const petDto = PetMapper.fromEntityToDTO(pet);
      if (pet.categoryId !=null && pet.tagId != null) {
        const category = await this.categoryRepository.findOne(pet.categoryId);
        const tag = await this.tagRepository.findOne(pet.tagId);
        petDto.category = category;
        petDto.tag = tag;
      }
      return petDto;
    }





    // async update(userDTO: UserDTO, updater?: string): Promise<UserDTO | undefined> {
    //     // return this.save(userDTO, updater);
    //   return null;
    // }
    //
    // async delete(userDTO: UserDTO): Promise<UserDTO | undefined> {
    //     // const user = UserMapper.fromDTOtoEntity(userDTO);
    //     // const result = await this.userRepository.remove(user);
    //     // return UserMapper.fromEntityToDTO(result);
    //   return null;
    // }
}
