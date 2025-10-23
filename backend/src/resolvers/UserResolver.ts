import * as argon from "argon2";
import {
  IsString,
  Length, Matches
} from "class-validator";
import type { Response } from "express";
import { GraphQLError } from "graphql";
import * as jwt from "jsonwebtoken";
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
import { City } from "../entities/City";
import { User, UserRole } from "../entities/User";
import { badUserInputError, checkIdFormat, notFoundError } from "../utils/errors";
import { Transform } from "class-transformer";

@InputType()
export class NewUserInput {
  @Field()
  @Transform(({ value }) => value.trim())
  @IsString()
  @Length(1, 100)
  firstname!: string;

  @Field()
  @Transform(({ value }) => value.trim())
  @IsString()
  @Length(1, 100)
  lastname!: string;

  @Field()
  @Transform(({ value }) => value.trim().toLowerCase())
  @IsString()
  @Length(5, 255)
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: "L'email doit être une adresse email valide.",
  })
  email!: string;

  @Field()
  password!: string;

  @Field()
  cityId!: string;
}

@InputType()
export class UserInput {
  @Field()
  @Transform(({ value }) => value.trim().toLowerCase())
  @IsString()
  @Length(5, 255)
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: "L'email doit être une adresse email valide.",
  })
  email!: string;

  @Field()
  @Transform(({ value }) => value.trim())
  password!: string;
}

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @Transform(({ value }) => value.trim())
  firstname?: string;

  @Field({ nullable: true })
  @Transform(({ value }) => value.trim())
  lastname?: string;

  @Field({ nullable: true })
  @Transform(({ value }) => value.trim().toLowerCase())
  @IsString()
  @Length(5, 255)
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: "L'email doit être une adresse email valide.",
  })
  email?: string;

  @Field({ nullable: true })
  password?: string;

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
    checkIdFormat(id);
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
      throw badUserInputError("Email already used.", "EMAIL_ALREADY_IN_USE");
    }

    const city = await City.findOneBy({ id: data.cityId });
    if (!city) {
      throw notFoundError("The selected city does not exist.");
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
      userId: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      city: user.city,
      role: user.role,
    };
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
      userId: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
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
     
    if (user.role !== UserRole.SUPER_ADMIN && user.id !== id) {
      throw new GraphQLError("Accès interdit", {
        extensions: { code: "FORBIDDEN" },
      });
    }
    checkIdFormat(id);
    const targetUser = await User.findOne({ where: { id } });
    if (!targetUser) {
      throw notFoundError("User not found.");
    }
    Object.assign(targetUser, data);
    await targetUser.save();
    return targetUser;
  }

@Mutation(() => User)
  @Authorized(UserRole.USER, UserRole.SUPER_USER, UserRole.CITY_ADMIN, UserRole.SUPER_ADMIN)
  async deleteUser(
    @Arg("userId") id: string,
    @Arg("password") password: string
  ): Promise<User> {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw new GraphQLError("Utilisateur non trouvé.", {
        extensions: { code: "USER_NOT_FOUND" },
      });
    }
    const validPassword = await argon.verify(user.hashedPassword, password);
    if (!validPassword) {
      throw new GraphQLError("Mot de passe invalide.", {
        extensions: { code: "INVALID_PASSWORD" },
      });
    }

    const deletedUser = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      city: user.city,
    };

    return deletedUser as User;
  }

  @Mutation(() => Boolean)
  async deleteUserByAdmin(@Arg("userId") id: string): Promise<boolean> {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw new GraphQLError("Utilisateur non trouvé.", {
        extensions: { code: "USER_NOT_FOUND" },
      });
    };
    await user.remove();
    return true;
  }
}



