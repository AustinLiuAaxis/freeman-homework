import {EntityRepository, Repository} from 'typeorm';
import {Category} from "../domain/category.entity";
import {Tag} from "../domain/tag.entity";

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {}
