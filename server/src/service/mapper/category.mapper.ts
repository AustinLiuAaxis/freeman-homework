import {Pet} from "../../domain/pet.entity";
import {PetDto} from "../dto/pet.dto";
import {Category} from "../../domain/category.entity";
import {CategoryDto} from "../dto/category.dto";

/**
 * An Pet mapper object.
 */
export class CategoryMapper {
    static fromDTOtoEntity(categoryDto: CategoryDto): Category {
        if (!categoryDto) {
            return;
        }
        const category = new Category();
        const fields = Object.getOwnPropertyNames(categoryDto);
        fields.forEach(field => {
          category[field] = categoryDto[field];
        });
        return category;
    }

    static fromEntityToDTO(category: Category): CategoryDto {
        if (!category) {
            return;
        }
        const categoryDto = new CategoryDto();

        const fields = Object.getOwnPropertyNames(category);

        fields.forEach(field => {
          categoryDto[field] = category[field];
        });

        return categoryDto;
    }
}
