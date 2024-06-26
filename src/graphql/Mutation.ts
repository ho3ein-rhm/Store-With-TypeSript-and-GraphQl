import { User } from "@prisma/client";
import { mutationType, stringArg } from "nexus";
import { IMycontext } from "../interface";
import { hashPassword } from "../utils";

export const Mutation = mutationType({
  definition(t) {
    t.boolean("registerUser", {
      args: {
        name: stringArg(),
        email: stringArg(),
        password: stringArg(),
        username: stringArg(),
      },
      resolve: async (
        _,
        { ...userDeatals }: Omit<User, "id">,
        { prisma }: IMycontext
      ) => {
        try {
          const hashedPassword = await hashPassword(userDeatals.password);
          const newUser = await prisma.user.create({
            data: { ...userDeatals, password: hashedPassword },
          });
          console.log(newUser);
          return true;
        } catch (error: any) {
          console.log(error.code);
          const errorCaught: Error = error as Error;
          if (error.code == "P2002")
            errorCaught.message = "username Or email already taken";
          return new Error(errorCaught.message);
        }
      },
    });
  },
});
