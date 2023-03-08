import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  forwardRef,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { ApolloError } from "apollo-server-express";
import { PrivacyInfo } from "src/decorators";
import { RedisService } from "src/redis/redis.service";

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => RedisService)) private redisService: RedisService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlCtx = GqlExecutionContext.create(context);
    const request = gqlCtx.getContext().req;
    const user = request.user;
    const privacyInfo: PrivacyInfo = {
      ip: request.ip,
      userAgent: request.headers["user-agent"],
    };

    const isActive = await this.redisService.isSessionActive(
      user.id,
      privacyInfo,
    );

    if (!isActive)
      throw new ApolloError(
        "Current session has no permition to perform this action",
      );

    return isActive;
  }
}
