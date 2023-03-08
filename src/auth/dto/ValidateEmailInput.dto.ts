import { Field, InputType } from "@nestjs/graphql";
import { IsString } from "class-validator";
import { ValidateEmailInput } from "src/graphql";

@InputType()
export class ValidateEmailInputDTO extends ValidateEmailInput {
  @Field()
  @IsString()
  token: string;
}
