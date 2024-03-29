import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './config/MongooseConfigService';
import configuration from './config/configuration';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CostsModule } from './costs/costs.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      // create dynamic module, that requires async during initialization
      imports: [ConfigModule], // which module import
      useClass: MongooseConfigService, // which class using
    }),
    ConfigModule.forRoot({
      // create dynamic module without async
      load: [configuration],
    }),
    UsersModule,
    AuthModule,
    CostsModule,
  ],
})
export class AppModule {}
