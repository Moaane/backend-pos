import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class FormatResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((value) => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;
        const isPaginatedResult = value.data && value.meta !== undefined;
        const formattedResponse = {
          status: 'success',
          statusCode: statusCode,
          message: 'Request was successful',
          data: isPaginatedResult ? value.data : value,
        };
        return formattedResponse;
      }),
    );
  }
}
