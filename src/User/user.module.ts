import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { EasyconfigModule, EasyconfigService } from 'nestjs-easyconfig';
import { jwt } from '../config';
import { JwtStrategy } from './jwt.strategy';
import { CompanySchema } from './schemas/company.schema';
import { UserSchema } from './schemas/user.schema';
import { UserController } from './users.controller';
import { UserService } from './users.service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'company', schema: CompanySchema },
			{ name: 'users', schema: UserSchema },
		]),
		JwtModule.registerAsync({
			imports: [EasyconfigModule],
			useFactory: async (configService: EasyconfigService) => ({
				secret: configService.get('JWT_SECRET') || jwt.secret,
				signOptions: { expiresIn: jwt.expires },
			}),
			inject: [EasyconfigService],
		}),
	],
	// exports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
	controllers: [UserController],
	providers: [UserService, JwtStrategy],
})
export class UserModule {}
