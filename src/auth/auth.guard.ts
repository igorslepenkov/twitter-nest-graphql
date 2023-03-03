import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from "@nestjs/common";
import {
  TokenExpiredError,
  JsonWebTokenError,
  NotBeforeError,
} from "jsonwebtoken";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { ApolloError } from "apollo-server-express";
import { parseBearerToken } from "src/utils";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject("JwtAccessService") private jwtAccessService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const gqlCtx = GqlExecutionContext.create(context);
    const request = gqlCtx.getContext().req;
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) {
      throw new ApolloError("Authorization header is missing");
    }

    const token = parseBearerToken(authorizationHeader);

    if (token) {
      try {
        const payload = this.jwtAccessService.verify(token);
        if (payload && "userId" in payload) {
          request.userId = payload.userId;
          return true;
        }

        throw new ApolloError("User could not be authenticated");
      } catch (err) {
        console.log(err);
        if (err instanceof TokenExpiredError) {
          throw new ApolloError("Token expired");
        }

        if (err instanceof JsonWebTokenError) {
          throw new ApolloError("Token invalid");
        }

        if (err instanceof NotBeforeError) {
          throw new ApolloError("Token is not active, please wait");
        }

        throw new ApolloError("Unexpected token validation error");
      }
    }

    throw new ApolloError("Token invalid");
  }
}
