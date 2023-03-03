import { Inject } from "@nestjs/common";
import { UserInput } from "src/graphql";
import { PrismaService } from "../prisma";

export class UsersService{
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async getAll(){
    const {user} = this.prisma
    return await user.findMany({include: {records: true}})
  }

  async getById(id: string){
    const {user} = this.prisma

    return await user.findFirst({where: {id}});
  }

  async create(userInput: UserInput){
    const {user} = this.prisma;

    return await user.create({data: userInput, include: {records: true}})
  }
}