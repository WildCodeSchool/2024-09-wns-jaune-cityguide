import {
  Arg,
  Field,
  InputType,
  Query,
  Resolver,
  Mutation,
  ID,
  Ctx,
} from "type-graphql";
import { City } from "../entities/City";
import { InterestPoint } from "../entities/InterestPoint";
import { requireRole } from "../middleware/authChecker";
import { UserRole } from "../entities/User";


interface Context {
  user?: { id: string; role: UserRole };
}
import { GraphQLError } from "graphql";
import { In } from "typeorm";


@InputType()
export class CityInput {
  @Field()
  name!: string;

  @Field()
  postalCode!: string;

  @Field()
  latitude!: number;

  @Field()
  longitude!: number;

  @Field(() => [ID])
  interestPoints?: InterestPoint[];
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
  async getCityById(@Arg("adId") id: string) {
    const city = await City.findOneOrFail({
      where: { id },
      relations: ["interestPoints", "users"],
    });
    if (!city) {
      throw new Error("City not found");
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
    
    const existingCity = await City.findOne({ where: { postalCode: data.postalCode } });
    if (existingCity) {
      throw new GraphQLError("City already exists", {
        extensions: { code: "BAD_USER_INPUT" },
      });
    }
    if (!data.postalCode || data.postalCode.trim() === "") {
      throw new GraphQLError("Invalid postal code", {
        extensions: { code: "BAD_USER_INPUT" },
      });
    }

    let city = new City();
    city = Object.assign(city, data);

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

    let city = await City.findOneByOrFail({ id });
    city = Object.assign(city, data);
    await city.save();
    return city;
  }

  @Mutation(() => Boolean)
  async deleteCityById(@Arg("cityId") id: string,
  @Ctx() context: Context
) {

  requireRole(context.user, [UserRole.SUPER_ADMIN]);
  return (await City.delete({ id })).affected;
  }
}
