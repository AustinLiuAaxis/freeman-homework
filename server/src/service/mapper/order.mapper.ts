import { User } from '../../domain/user.entity';
import { UserDTO } from '../dto/user.dto';
import {Pet} from "../../domain/pet.entity";
import {PetDto} from "../dto/pet.dto";
import {OrderDto} from "../dto/order.dto";
import {Order} from "../../domain/order.entity";

/**
 * An Pet mapper object.
 */
export class OrderMapper {
    static fromDTOtoEntity(orderDto: OrderDto): Order {
        if (!orderDto) {
            return;
        }
        const order = new Order();
        const fields = Object.getOwnPropertyNames(orderDto);
        for(let index in fields){
          if(fields[index] == 'pet'){
            order['petId'] =  orderDto[fields[index]].id;
            continue;
          }
          order[fields[index]] = orderDto[fields[index]];
        }
        return order;
    }

    static fromEntityToDTO(order: Order): OrderDto {
        if (!order) {
            return;
        }
        const orderDto = new OrderDto();
        const fields = Object.getOwnPropertyNames(order);

      for(let index in fields){
        if(fields[index] == 'petId'){
          continue;
        }
        orderDto[fields[index]] = order[fields[index]];
      }

        return orderDto;
    }
}
