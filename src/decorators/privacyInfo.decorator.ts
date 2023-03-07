import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export interface PrivacyInfo {
  ip: string;
  userAgent: string;
}

export const PrivacyInfo = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): PrivacyInfo => {
    const request = GqlExecutionContext.create(ctx).getContext().req;
    return {
      ip: request.ip,
      userAgent: request.headers["user-agent"],
    };
  },
);
