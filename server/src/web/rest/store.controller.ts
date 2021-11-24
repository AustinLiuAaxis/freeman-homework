import {Controller, Get, Logger, Post, UseInterceptors} from '@nestjs/common';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { ApiUseTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('store')
@UseInterceptors(LoggingInterceptor)
@ApiUseTags('management-controller')
export class ManagementController {
    logger = new Logger('ManagementController');

    @ApiExcludeEndpoint()
    @Post('/inventory')
    @ApiOperation({ title: 'Microservice Info' })
    @ApiResponse({
        status: 201,
        description: 'add pet to the store',
    })
    inventory(): any {
      //search for all pets inventory
        return {
            activeProfiles: 'dev',
            'display-ribbon-on-profiles': 'dev',
        };
    }
}
