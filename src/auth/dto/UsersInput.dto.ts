import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, MinLength, IsString } from "class-validator";
import { UsersInput } from "src/graphql";

@InputType()
export class UsersInputDTO extends UsersInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @MinLength(6)
  password: string;
}
