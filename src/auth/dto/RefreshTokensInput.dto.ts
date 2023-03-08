import { Field, InputType } from "@nestjs/graphql";
import { IsString } from "class-validator";
import { RefreshTokensInput } from "src/graphql";

@InputType()
export class RefreshTokensInputDTO extends RefreshTokensInput {
  @Field()
  @IsString()
  refreshToken: string;
}
