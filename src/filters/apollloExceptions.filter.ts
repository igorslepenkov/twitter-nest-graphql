import { ArgumentsHost, Catch } from "@nestjs/common";
import { GqlArgumentsHost, GqlExceptionFilter } from "@nestjs/graphql";
import { ApolloError } from "apollo-server-express";

@Catch(ApolloError)
export class ApolloErrorFilter implements GqlExceptionFilter {
  catch(exception: ApolloError, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    console.log(
      `Next exception was returned to the client: ${exception.name} // ${exception.message}`,
    );
    return exception;
  }
}
