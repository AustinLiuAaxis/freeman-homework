import {Body, Controller, Delete, Get, Logger, Param, Post, Req, UseInterceptors} from '@nestjs/common';
import {LoggingInterceptor} from '../../client/interceptors/logging.interceptor';
import {ApiUseTags, ApiResponse, ApiOperation, ApiExcludeEndpoint} from '@nestjs/swagger';
import {PetService} from "../../service/pet.service";
import {PetDto} from "../../service/dto/pet.dto";
import {Roles, RoleType} from "../../security";
import {Request} from "../../client/request";
import {HeaderUtil} from "../../client/header-util";
import {OrderDto} from "../../service/dto/order.dto";
import {DeleteResult} from "typeorm";

@Controller('store')
@UseInterceptors(LoggingInterceptor)
@ApiUseTags('management-controller')
export class StoreController {
  logger = new Logger('ManagementController');

  constructor(private readonly petService: PetService) {
  }

  @Get('/inventory')
  async inventory(): Promise<any> {
    return {
      count: await this.petService.getCount(),
      succeed: true
    }

  }


  @Post('/order')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'place order' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PetDto,
  })
  async placeOrder(@Req() req: Request, @Body() orderDto: OrderDto): Promise<OrderDto> {
    const created = await this.petService.placeOrder(orderDto, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Order', created.id);
    return created;
  }

  @Get('/order/:orderId')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'get order' })
  @ApiResponse({
    status: 201,
    description: 'find record',
    type: PetDto,
  })
  async getOrder(@Param('orderId') orderId: number): Promise<OrderDto> {
    const created = await this.petService.getOrderById(orderId);
    return created;
  }


  @Delete('/order/:orderId')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'delete order' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PetDto,
  })
  async delteOrder(@Param('orderId') orderId: number): Promise<DeleteResult> {
    const deleteResult = await this.petService.deleteOrder(orderId);
    return deleteResult;
  }




}
