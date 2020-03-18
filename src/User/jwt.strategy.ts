import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { EasyconfigService } from 'nestjs-easyconfig';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwt } from '../config';
import { UserPayloadInterface } from './interfaces/payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private configService: EasyconfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get('JWT_SECRET') || jwt.secret,
		});
	}

	async validate(payload: UserPayloadInterface) {
		return { username: payload.username, userId: payload.userId };
	}
}
