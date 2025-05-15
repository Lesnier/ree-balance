import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { EnergyModule } from './energy/energy.module';

import { ScheduleModule } from '@nestjs/schedule';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {MongooseModule} from "@nestjs/mongoose";
import {EnergyService} from "./energy/energy.service";
import {EnergyModel} from "./energy/models/energy.model";



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
      EnergyModule,  ScheduleModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    sortSchema: true,
  }), MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://mongo:27017/energydb'), EnergyModel],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
