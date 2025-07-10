import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({

  imports: [
     ConfigModule.forRoot({
      isGlobal: true,  // робить ConfigModule доступним у всіх модулях
    }),
    UsersModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        return {
          secret,
          signOptions: { expiresIn: '1h' },
        };
      },
      inject: [ConfigService],
    }),

  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
