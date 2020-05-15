import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class SeederGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		var request = context.switchToHttp().getRequest(),
			authHeader = request.headers.authorization.split(' '),
			authToken =
				authHeader[0].toLowerCase() == 'bearer' ? authHeader[1] : authHeader[0];
		console.log(authToken);
		return authToken === process.env.SEED_KEY;
	}
}
