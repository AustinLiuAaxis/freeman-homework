import {Tag} from "../../domain/tag.entity";
import {Category} from "../../domain/category.entity";

/**
 * An User DTO object.
 */
export class PetDto {

  id: number;

  category: Category;

  name: string;

  photoUrls: string;

  status: string | null;

  tag: Tag;

}
