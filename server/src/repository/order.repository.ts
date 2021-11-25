import { EntityRepository, Repository } from 'typeorm';
import {Pet} from "../domain/pet.entity";
import {Order} from "../domain/order.entity";

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {}
