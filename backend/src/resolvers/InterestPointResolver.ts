import { Arg, Field, InputType, Query, Resolver, Mutation } from "type-graphql";
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
		const interestpoints = await InterestPoint.find({
            relations: [/* "category", "city" */]
        });
		return interestpoints;
	}

    @Query(() => InterestPoint)
    async getInterestPointsByCategory(@Arg("category_id") id: string) {
        const interestpoints = await InterestPoint.find({ 
            where: { /* id_category: { id } */ } 
        });
        return interestpoints;
    }

    @Query(() => InterestPoint)
    async getInterestPointsByCity(@Arg("city_id") id: string) {
        const interestpoints = await InterestPoint.find({ 
            where: { /* id_city: { id } */} 
        });
        return interestpoints;
    }

    @Query(() => InterestPoint)
    async getInterestPointById(@Arg("interest_point_id") id: string) {
        const interestpoint = await InterestPoint.findOneOrFail({
            where: { id },
			relations: [/* "category", "city" */]
        });
        return interestpoint;
    }

    @Mutation(() => InterestPoint)
	async createInterestPoint(@Arg("data") data: InterestPointInput) {
		let interestpoint = new InterestPoint()
		interestpoint = Object.assign(interestpoint, data);
		// const categories = await Category.findBy({id: In(data.category)});
		// interestpoint.categories = categories;
		await interestpoint.save()
		return interestpoint;
	}
}