import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import configuration from './config/configurations';
import { MovieModule } from './core/modules/movie/Movie.module';
import { EnvTypes } from './config/types';

@Module({
    imports: [
        MovieModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
            cache: true,
        }),
        GraphQLModule.forRoot({
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            sortSchema: true,
            playground: true,
            context: ({ req }) => ({ req }),
            installSubscriptionHandlers: true,
            schemaDirectives: {
            },
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService<EnvTypes>) => {
                return {uri: configService.get("dbUrl")}
            },
        })
    ],
    providers: [],
})
export class AppModule {}
