import {Body, Controller, Delete, Get, Logger, Param, Post, Put, Req, UseInterceptors} from '@nestjs/common';
import {LoggingInterceptor} from '../../client/interceptors/logging.interceptor';
import {ApiOperation, ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {Roles, RoleType} from "../../security";
import {PetDto} from "../../service/dto/pet.dto";
import {PetService} from "../../service/pet.service";
import {Request} from "../../client/request";
import {HeaderUtil} from "../../client/header-util";
import {DeleteResult} from "typeorm";

@Controller('pet')
@UseInterceptors(LoggingInterceptor)
@ApiUseTags('management-controller')
export class PetController {
    logger = new Logger('PetController');

  constructor(private readonly petService: PetService) {}

    // @ApiExcludeEndpoint()
    // @Post()
    // @ApiOperation({ title: 'Microservice Info' })
    // @ApiResponse({
    //     status: 201,
    //     description: 'add pet to the store',
    // })
    // add(): any {
    //     return {
    //         activeProfiles: 'dev',
    //         'display-ribbon-on-profiles': 'dev',
    //     };
    // }


  @Get('/:id')
  @Roles(RoleType.USER || RoleType.ADMIN)
  @ApiOperation({ title: 'Get pet' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: PetDto,
  })
  async getPet(@Param('id') petId: number): Promise<PetDto> {
    return await this.petService.findById(petId);
  }


  @Post()
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'register a pet' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PetDto,
  })
  async registerPet(@Req() req: Request, @Body() petDTO: PetDto): Promise<PetDto> {
    const created = await this.petService.save(petDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Pet', created.id);
    return created;
  }


  @Post('/:id/uploadImage')
  @Roles(RoleType.USER || RoleType.ADMIN)
  @ApiOperation({ title: 'upload image' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PetDto,
  })
  async uploadImage(@Param('id') petId: number, @Body() petDTO: PetDto): Promise<PetDto> {
    if(petDTO){
      petDTO.id = petId;
    }
    const created = await this.petService.update(petDTO);
    return created;
  }



  @Put()
  @Roles(RoleType.USER || RoleType.ADMIN)
  @ApiOperation({ title: 'update pet' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PetDto,
  })
  async update(@Req() req: Request, @Body() petDTO: PetDto): Promise<PetDto> {
    const updated = await this.petService.update(petDTO);
    return updated;
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'delete pet' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PetDto,
  })
  async delete(@Param('id') petId: number): Promise<DeleteResult> {
    return await this.petService.delete(petId);
  }



}
