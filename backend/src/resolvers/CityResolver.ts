import { Transform } from "class-transformer";
import {IsArray, IsNumber, IsOptional, IsString, Length, Max, Min } from "class-validator";
import {
  Arg,
  Authorized,
  Field,
  ID,
  InputType,
  Mutation,
  Query,
  Resolver,
  Mutation,
  ID,
  Ctx,
} from "type-graphql";

import { In } from "typeorm";
import { City } from "../entities/City";
import { InterestPoint } from "../entities/InterestPoint";
import { requireRole } from "../middleware/authChecker";
import { UserRole } from "../entities/User";


interface Context {
  user?: { id: string; role: UserRole };
}
import { GraphQLError } from "graphql";
import { badUserInputError, checkIdFormat, notFoundError } from "../utils/errors";
import { sanitizeObjectStrings } from "../utils/sanitize";
import { In } from "typeorm";


@InputType()
export class CityInput {
  @Field()
  @Transform(({ value }) => value.trim())
  @IsString()
  @Length(2, 255)
  name!: string;

  @Field()
  @Transform(({ value }) => value.trim())
  @IsString({ message: "Postal code must be a string." })
  @Length(5, 10, {
    message: "Postal code must be between 5 and 10 characters.",
  })
  postalCode!: string;

  @Field()
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude!: number;

  @Field()
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude!: number;

  @Field(() => [ID])
  @IsOptional()
  @IsArray()
  interestPoints?: string[];
}

@Resolver(City)
export class CityResolver {
  @Query(() => [City])
  async getCities() {
    const cities = await City.find({
      relations: {
        users: true,
      },
    });
    return cities;
  }

  @Query(() => City)
  async getCityById(@Arg("cityId") id: string) {
    checkIdFormat(id);
    const city = await City.findOne({
      where: { id },
      relations: ["interestPoints", "users"],
    });
    if (!city) {
      throw notFoundError("Selected city does not exist.");
    }
    return city;
  }

  @Query(() => Number)
  async getCityCount(): Promise<number> {
    return await City.count();
  }

  @Mutation(() => City)
  async createCity(@Arg("data") data: CityInput, @Ctx() context: Context) {
       
    requireRole(context.user, [UserRole.SUPER_ADMIN]);
    
    const existingCity = await City.findOne({ 
      where: { 
        name: data.name, 
        postalCode: data.postalCode 
      } 
    });
  if (existingCity) {
    throw badUserInputError("A city with this name and postal code already exists.", "CITY_ALREADY_EXISTS");
  }
    let city = new City();
    const cleanData = sanitizeObjectStrings(data, [
      "name",
      "postalCode",
      "latitude",
      "longitude",
    ]);
    city = Object.assign(city, cleanData);
    const interestPoints = data.interestPoints
      ? await InterestPoint.findBy({ id: In(data.interestPoints) })
      : [];

    city.interestPoints = interestPoints;
    await city.save();
    return city;
  }

  @Mutation(() => City)
  async updateCityById(
    @Arg("cityId") id: string,
    @Arg("data") data: CityInput,
    @Ctx() context: Context
  ) {

    requireRole(context.user, [UserRole.SUPER_ADMIN]);

    checkIdFormat(id);
    let city = await City.findOneByOrFail({ id });

        const cleanData = sanitizeObjectStrings(data, [
      "name",
      "postalCode",
      "latitude",
      "longitude",
    ]);
    city = Object.assign(city, cleanData);
    const interestPoints = data.interestPoints
      ? await InterestPoint.findBy({ id: In(data.interestPoints) })
      : [];
    city.interestPoints = interestPoints;

    city = Object.assign(city, data);
    await city.save();
    return city;
  }

  @Mutation(() => Boolean)
  async deleteCityById(@Arg("cityId") id: string,
  @Ctx() context: Context
) {

  requireRole(context.user, [UserRole.SUPER_ADMIN]);
    checkIdFormat(id);
    const city = await City.findOne({ where: { id } });
    if (!city) {
      throw notFoundError("The selected city does not exist.");
    }
  return (await City.delete(city.id)).affected;
  }
}
