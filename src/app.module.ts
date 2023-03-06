import { join } from "path";

import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule, UsersService } from "./users";
import { PrismaModule, PrismaService } from "./prisma";
import { AuthModule } from "./auth/auth.module";
import { AuthService } from "./auth/auth.service";
import { RedisModule } from "./redis/redis.module";
import { MailersModule } from './mailers/mailers.module';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      typePaths: ["./**/*.graphql"],
      definitions: {
        path: join(process.cwd(), "src/graphql/definitions.ts"),
        outputAs: "class",
      },
      csrfPrevention: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    RedisModule,
    MailersModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, PrismaService, UsersService],
})
export class AppModule {}
