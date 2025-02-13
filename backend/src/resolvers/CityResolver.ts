import { Arg, Field, InputType, Query, Resolver } from "type-graphql";
import { City } from "../entities/City";



@InputType()
export class CityInput {
    @Field()
    name!: string;

    @Field()
    postalCode!: string;

    @Field()
    lattitude!: number;

    @Field()
    longitude!: number;
}



@Resolver(City)
export class CityResolver {
    @Query(() => [City])
    async getCities() {
        const cities = await City.find();
        return cities;
    }
}