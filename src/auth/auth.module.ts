// src/auth/auth.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import jwtConfig from './config/jwt.config';
import { GenerateTokensProvider } from './provider/generate-token.provider';
import { BcryptProvider } from './provider/bcrpt.provider';
import { HashingProvider } from './provider/hashing.provider';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig), // Loads JWT configuration
    JwtModule.register({}),
    forwardRef(() => UserModule),
  ],
  exports: [AuthService],
  controllers: [AuthController],
  providers: [
    AuthService,
    GenerateTokensProvider,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
  ],
})
export class AuthModule {}
