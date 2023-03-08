import { IsUUID } from "class-validator";
import { GetUserInput } from "src/graphql";

export class GetUserInputDTO extends GetUserInput {
  @IsUUID(4)
  id: string;
}
