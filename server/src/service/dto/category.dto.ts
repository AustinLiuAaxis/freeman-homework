import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';
import { BaseDTO } from './base.dto';
import { Exclude } from 'class-transformer';
import {Column} from "typeorm";

/**
 * An User DTO object.
 */
export class CategoryDto {

  id: number;

  name: string;

}
