import { Arg, Field, InputType, Query, Resolver } from "type-graphql";
import { InterestPoint } from "../entities/InterestPoint";

@InputType()
export class InterestPointInput {
	@Field()
	name!: string;

	@Field()
	description!: string;

	@Field()
	address!: string;

	@Field()
	latitude!: number;

	@Field()
	longitude!: number;

	@Field()
	link_url!: string;

	// @Field()
	// id_city!: number;

	// @Field()
	// id_category!: number;
}

@Resolver(InterestPoint)
export class InterestPointResolver {
	@Query(() => [InterestPoint])
	async getInterestPoints() {
		const interestPoints = await InterestPoint.find();
		return interestPoints;
	}
}
