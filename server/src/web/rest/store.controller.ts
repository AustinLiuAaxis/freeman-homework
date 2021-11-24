import {Controller, Get, Logger, Post, UseInterceptors} from '@nestjs/common';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { ApiUseTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('pet')
@UseInterceptors(LoggingInterceptor)
@ApiUseTags('management-controller')
export class ManagementController {
    logger = new Logger('ManagementController');

    @ApiExcludeEndpoint()
    @Post()
    @ApiOperation({ title: 'Microservice Info' })
    @ApiResponse({
        status: 201,
        description: 'add pet to the store',
    })
    info(): any {
        return {
            activeProfiles: 'dev',
            'display-ribbon-on-profiles': 'dev',
        };
    }
}
