import { Arg, Authorized, Ctx, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { User, UserRole } from "../entities/User";
import { Response } from "express";
import * as argon from "argon2";
import * as jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";


@InputType()
export class NewUserInput {
  @Field()
  firstname!: string;

  @Field()
  lastname!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;
}


@InputType()
export class UserInput {
  @Field()
  email!: string;

  @Field()
  password!: string;
}

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  firstname?: string;

  @Field({ nullable: true })
  lastname?: string;

  @Field({ nullable: true })
  email?: string;
}



@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  /* @Authorized(UserRole.SUPER_ADMIN) */
  async getUsers() {
    const users = await User.find();
    return users;
  }

  @Query(() => User)
  /* @Authorized(UserRole.USER, UserRole.SUPER_USER, UserRole.CITY_ADMIN, UserRole.SUPER_ADMIN) */
  async getUserById(@Arg("userId") id: string) {
    const user = await User.findOneBy({ id });
    if (!user) {
      throw new Error("User note found");
    }
    return user;
  }

  @Mutation(() => User)
  async registerUser(
    @Arg("data") data: NewUserInput,
    @Ctx() { res }: { res: Response }) {

    if (!process.env.TOKEN_SECRET_KEY) {
      throw new Error("Missing env variable");
    }

    const hashedPassword = await argon.hash(data.password);
    const user = await User.save({
      email: data.email,
      firstname: data.firstname,
      lastname: data.lastname,
      hashedPassword: hashedPassword,
      role: UserRole.USER,
    });

    const tokenContent = {
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
    };

    const token = jwt.sign(
      tokenContent,
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "7h" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict"
    });

    const profile = {
      mail: user.email,
      name: user.firstname,
    };
    return JSON.stringify(profile);
  }

  @Mutation(() => String)
  async loginUser(
    @Arg("data") data: UserInput,
    @Ctx() { res }: { res: Response }) {

    if (!process.env.TOKEN_SECRET_KEY) {
      throw new Error("Missing env variable");
    }

    const user = await User.findOneBy({ email: data.email });
    if (!user) {
      throw new GraphQLError("Le compte avec cet email n'existe pas.", {
        extensions: { code: "USER_NOT_FOUND" },
      });
    };

    const validPassword = await argon.verify(user.hashedPassword, data.password);
    if (!validPassword) {
      throw new GraphQLError("Email ou mot de passe invalide.", {
        extensions: { code: "INVALID_PASSWORD" },
      });
    };

    const tokenContent = {
      userId: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
    };

    const token = jwt.sign(tokenContent, process.env.TOKEN_SECRET_KEY, { expiresIn: "7h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict"
    });

    const profile = {
      mail: user.email,
      name: user.firstname,
    };
    return JSON.stringify(profile);
  }


  @Mutation(() => User)
  /* @Authorized(UserRole.SUPER_ADMIN, UserRole.CITY_ADMIN, UserRole.SUPER_USER, UserRole.USER) */
  async updateUser(
    @Arg("userId") id: string,
    @Arg("data") data: UpdateUserInput) {
    let user = await User.findOneByOrFail({ id });
    user = Object.assign(user, data);
    user.save();
    return user;
  }


  @Mutation(() => User)
  /* @Authorized(UserRole.SUPER_ADMIN, UserRole.SUPER_USER, UserRole.USER) */
  async deleteUser(
    @Arg("userId") id: string) {
    const user = await User.findOneByOrFail({ id });

    // Stocker une copie de l'utilisateur avant suppression
    const deletedUser = { ...user };

    await user.remove();

    // Retourner la copie de l'utilisateur supprimé
    return deletedUser;
  }
}