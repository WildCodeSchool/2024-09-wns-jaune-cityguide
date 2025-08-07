import { Transform } from "class-transformer";
import {IsArray, IsNumber, IsOptional, IsString, Length, Max, Min } from "class-validator";
import {
  Arg,
  Field,
  ID,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { In } from "typeorm";
import { City } from "../entities/City";
import { InterestPoint } from "../entities/InterestPoint";
import { badUserInputError, checkIdFormat, notFoundError } from "../utils/errors";
import { sanitizeObjectStrings } from "../utils/sanitize";


@InputType()
export class CityInput {
  @Field()
  @Transform(({ value }) => value.trim())
  @IsString()
  @Length(2, 255)
  name!: string;

  @Field()
  @Transform(({ value }) => value.trim())
  @IsString({ message: "Le code postal doit être une chaîne de caractères." })
  @Length(5, 10, {
    message: "Le code postal doit contenir entre 5 et 10 caractères.",
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
      throw notFoundError("La ville sélectionnée n'existe pas.");
    }
    return city;
  }

  @Query(() => Number)
  async getCityCount(): Promise<number> {
    return await City.count();
  }

  @Mutation(() => City)
  async createCity(@Arg("data") data: CityInput) {
    const existingCity = await City.findOne({ 
      where: { 
        name: data.name, 
        postalCode: data.postalCode 
      } 
    });
  if (existingCity) {
    throw badUserInputError("Une ville avec ce nom et ce code postal existe déjà.");
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
    @Arg("data") data: CityInput
  ) {
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
    await city.save();
    return city;
  }

  @Mutation(() => Boolean)
  async deleteCityById(@Arg("cityId") id: string) {
    checkIdFormat(id);
    const city = await City.findOne({ where: { id } });
    if (!city) {
      throw notFoundError("La ville sélectionnée n'existe pas.");
    }
    return (await City.delete(city.id)).affected;
  }
}
