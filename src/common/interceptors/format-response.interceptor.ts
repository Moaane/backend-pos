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
        const formattedResponse = {
          status: 'success',
          statusCode: statusCode, // Menyertakan statusCode
          message: 'Request was successful', // Pesan tetap, sesuai keinginan Anda
          data: value ? value : [], // Mengatur data yang dikembalikan
        };
        return formattedResponse;
      }),
    );
  }
}
