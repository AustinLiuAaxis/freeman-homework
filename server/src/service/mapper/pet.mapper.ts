import { User } from '../../domain/user.entity';
import { UserDTO } from '../dto/user.dto';
import {Pet} from "../../domain/pet.entity";
import {PetDto} from "../dto/pet.dto";

/**
 * An Pet mapper object.
 */
export class PetMapper {
    static fromDTOtoEntity(petDto: PetDto): Pet {
        if (!petDto) {
            return;
        }
        const pet = new Pet();
        const fields = Object.getOwnPropertyNames(petDto);
        for(let index in fields){
          if(fields[index] == 'tag'){
            pet['tagId'] =  petDto[fields[index]].id;
            continue;
          }
          if(fields[index] == 'category'){
            pet['categoryId'] =  petDto[fields[index]].id;
            continue;
          }
            pet[fields[index]] = petDto[fields[index]];
        }
        return pet;
    }

    static fromEntityToDTO(pet: Pet): PetDto {
        if (!pet) {
            return;
        }
        const petDto = new PetDto();

        const fields = Object.getOwnPropertyNames(pet);

      for(let index in fields){
        if(fields[index] == 'tagId'){
          continue;
        }
        if(fields[index] == 'categoryId'){
          continue;
        }
        petDto[fields[index]] = pet[fields[index]];
      }

        return petDto;
    }
}
