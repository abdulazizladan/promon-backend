import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JWTStrategy } from './jwt.strategy';

@Module({
  providers: [
    AuthService, 
    LocalStrategy,
    JWTStrategy,
    {
      provide: 'JWT_SECRET',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('JWT_SECRET')
    }
  ],
  imports: [
    UserModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      imports: [ConfigService],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => (
        {
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: '2h'}
        })
    })
  ],
  controllers: [AuthController],
  exports: [PassportModule]
})
export class AuthModule {}
