import { Arg, Field, InputType, Query, Resolver, Mutation, ID } from "type-graphql";
import { InterestPoint } from "../entities/InterestPoint";
import { City } from "../entities/City";
import { Category } from "../entities/Category";

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
	
	@Field(() => ID)
	city!: string;
	
	@Field(() => ID)
	category!: string;

	@Field(() => [ID], { nullable: true })
	pictures?: string[];
}

@Resolver(InterestPoint)
export class InterestPointResolver {
	@Query(() => [InterestPoint])
	async getInterestPoints() {
		const interestPoints = await InterestPoint.find({
			relations: ["category", "city", "pictures"]
		});
		return interestPoints;
	}
	
	@Query(() => [InterestPoint])
	async getInterestPointsByCategory(@Arg("categoryId") id: string) {
		const interestPoints = await InterestPoint.find({ 
			where: { category: { id } } ,
			relations: ["category", "city", "pictures"]
		});
		return interestPoints;
	}
	
	@Query(() => [InterestPoint])
	async getInterestPointsByCity(@Arg("cityId") id: string) {
		const interestPoints = await InterestPoint.find({ 
			where: { city: { id } },
			relations: ["category", "city", "pictures"]
		});
		return interestPoints;
	}
	
	@Query(() => InterestPoint)
	async getInterestPointById(@Arg("interestPointId") id: string) {
		const interestPoint = await InterestPoint.findOneOrFail({
			where: { id },
			relations: ["category", "city", "pictures"]
		});
		return interestPoint;
	}
	
	@Mutation(() => InterestPoint)
	async createInterestPoint(@Arg("data") data: InterestPointInput) {
		
		const city = await City.findOneOrFail({ where: { id: data.city}});
		const category = await Category.findOneOrFail({ where: { id: data.category}});

		let interestPoint = new InterestPoint();
		interestPoint = Object.assign(interestPoint, data);
		interestPoint.city = city;
		interestPoint.category = category;
		
		await interestPoint.save()
		return interestPoint;
	}
	
	@Mutation(() => Boolean)
	async deleteInterestPointById( @Arg("interestPointId") id: string) {
		return (await InterestPoint.delete({id})).affected
	}
	
	@Mutation(() => InterestPoint)
	async replaceInterestPointById( @Arg("interestPointId") id: string, @Arg("data") data: InterestPointInput ) {
		let interestPoint = await InterestPoint.findOneByOrFail({id})
		interestPoint = Object.assign(interestPoint, data);
		await interestPoint.save()
		return interestPoint;
	}
}