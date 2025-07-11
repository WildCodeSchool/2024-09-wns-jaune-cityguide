import {
  Arg,
  Authorized,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { User, UserRole } from "../entities/User";
import type { Response } from "express";
import * as argon from "argon2";
import * as jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";
import { City } from "../entities/City";

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

  @Field()
  cityId!: string;
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

  @Field({ nullable: true })
  city?: number;

  @Field(() => UserRole, { nullable: true })
  role?: UserRole;
}

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  @Authorized(UserRole.SUPER_ADMIN)
  async getUsers() {
    const users = await User.find({
      relations: ["city"],
    });
    return users;
  }

  @Query(() => User)
  @Authorized(UserRole.USER, UserRole.SUPER_USER, UserRole.CITY_ADMIN, UserRole.SUPER_ADMIN)
  async getUserById(@Arg("userId") id: string) {
    const user = await User.findOneOrFail({
      where: { id },
      relations: ["city"],
    });
    if (!user) {
      throw new Error("User note found");
    }
    return user;
  }

  @Query(() => Number)
  async getUserCount(): Promise<number> {
    return await User.count();
  }

  @Mutation(() => String)
  async registerUser(
    @Arg("data") data: NewUserInput,
    @Ctx() { res }: { res: Response }
  ) {
    if (!process.env.TOKEN_SECRET_KEY) {
      throw new Error("Missing env variable");
    }

    const existingUser = await User.findOneBy({ email: data.email });
    if (existingUser) {
      throw new Error("Cet email est déjà utilisé.");
    }

    const city = await City.findOneBy({ id: data.cityId });
    if (!city) {
      throw new Error("Ville introuvable");
    }

    const hashedPassword = await argon.hash(data.password);
    const user = await User.save({
      email: data.email,
      firstname: data.firstname,
      lastname: data.lastname,
      hashedPassword: hashedPassword,
      city: city,
    });

    const tokenContent = {
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
    };

    const token = jwt.sign(tokenContent, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "7h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    const profile = {
      mail: user.email,
      firstname: user.firstname,
      city: user.city,
    };
    console.log("profile", profile);
    return JSON.stringify(profile);
  }

  @Mutation(() => String)
  async loginUser(
    @Arg("data") data: UserInput,
    @Ctx() { res }: { res: Response }
  ) {
    if (!process.env.TOKEN_SECRET_KEY) {
      throw new Error("Missing env variable");
    }

    const user = await User.findOne({
      where: { email: data.email },
      relations: ["city"],
    });
    if (!user) {
      throw new GraphQLError("Le compte avec cet email n'existe pas.", {
        extensions: { code: "USER_NOT_FOUND" },
      });
    }

    const validPassword = await argon.verify(
      user.hashedPassword,
      data.password
    );
    if (!validPassword) {
      throw new GraphQLError("Email ou mot de passe invalide.", {
        extensions: { code: "INVALID_PASSWORD" },
      });
    }

    const tokenContent = {
      userId: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
    };

    const token = jwt.sign(tokenContent, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "7h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    const profile = {
      id: user.id,
      mail: user.email,
      firstname: user.firstname,
      city: user.city,
      role: user.role,
    };
    return JSON.stringify(profile);
  }

  @Mutation(() => String)
  async logoutUser(@Ctx() { res }: { res: Response }) {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    return "Déconnexion réussie !";
  }

  @Mutation(() => User)
  @Authorized(UserRole.USER, UserRole.SUPER_USER, UserRole.CITY_ADMIN, UserRole.SUPER_ADMIN)
  async updateUser(
    @Arg("userId") id: string,
    @Arg("data") data: UpdateUserInput,
    @Ctx() { user }: { user: User }
  ) {
     // Autorisé si SUPER_ADMIN ou si c'est le propre utilisateur
    if (user.role !== UserRole.SUPER_ADMIN && user.id !== id) {
      throw new GraphQLError("Accès interdit", {
        extensions: { code: "FORBIDDEN" },
      });
    }

    const targetUser = await User.findOneByOrFail({ id });
    Object.assign(targetUser, data);
    await targetUser.save();
    return targetUser;
}
  //   let user = await User.findOneByOrFail({ id });
  //   user = Object.assign(user, data);
  //   user.save();
  //   return user;
  // }

  @Mutation(() => User)
  @Authorized(UserRole.USER, UserRole.SUPER_USER, UserRole.CITY_ADMIN, UserRole.SUPER_ADMIN)
  async deleteUser(
    @Arg("userId") id: string,
    @Ctx() { user }: { user: User }
  ) {
     // Autorisé si SUPER_ADMIN ou si c'est le propre utilisateur
    if (user.role !== UserRole.SUPER_ADMIN && user.id !== id) {
      throw new GraphQLError("Accès interdit", {
        extensions: { code: "FORBIDDEN" },
      });
    }

    const targetUser = await User.findOneByOrFail({ id });
    const deletedCopy = { ...targetUser };
    await targetUser.remove();
    return deletedCopy;
  }
//     const user = await User.findOneByOrFail({ id });

//     // Stocker une copie de l'utilisateur avant suppression
//     const deletedUser = { ...user };

//     await user.remove();

//     // Retourner la copie de l'utilisateur supprimé
//     return deletedUser;
//   }
}
