import {
  Catch,
  RpcExceptionFilter,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class ExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException): Observable<any> {
    const error = exception.getError();
    console.log(error);
    return throwError(() =>
      error && (error as any).response ? (error as any).response : error
    );
  }
}
