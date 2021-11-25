import {Tag} from "../../domain/tag.entity";
import {Category} from "../../domain/category.entity";
import {Column} from "typeorm";
import {PetDto} from "./pet.dto";

/**
 * An User DTO object.
 */
export class OrderDto {

  id: number;

  pet:PetDto;

  quantity: number | null;

  shipDate: string | null;

  status: string | null;

  complete: string | null;

}
