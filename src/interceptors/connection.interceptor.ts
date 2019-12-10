import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConnectionService } from '../Shared/connection.service';

@Injectable()
export class ConnectionInterceptor implements NestInterceptor {
  constructor(private connectionService: ConnectionService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    console.log(req.user);
    // this.connectionService
    return next.handle();
    // .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}
