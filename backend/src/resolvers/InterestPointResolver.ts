import { Type } from "class-transformer";
import {IsArray, 
  IsInt, IsNumber, IsOptional, IsString, IsUrl, Length, Max, Min 
} from "class-validator";
import {
  Arg,
  Field,
  ID,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Category } from "../entities/Category";
import { City } from "../entities/City";
import { InterestPoint } from "../entities/InterestPoint";

@InputType()
export class InterestPointInput {
  @Field()
  @IsString()
  @Length(2, 255)
  name!: string;

  @Field()
  @IsString()
  @Length(10, 2000)
  description!: string;

  @Field()
  @IsString()
  @Length(2, 255)
  address!: string;

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

  @Field()
  @IsUrl({require_protocol: true})
  link_url!: string;

  @Field(() => ID)
  @Type(() => Number)
  @IsInt()
  city!: string;

  @Field(() => ID)
  @Type(() => Number)
  @IsInt()
  category!: number;

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  pictures?: string[];
}

@Resolver(InterestPoint)
export class InterestPointResolver {
  @Query(() => [InterestPoint])
  async getInterestPoints() {
    const interestPoints = await InterestPoint.find({
      relations: ["category", "city", "pictures"],
    });
    return interestPoints;
  }

  @Query(() => [InterestPoint])
  async getInterestPointsByCategory(@Arg("categoryId") id: string) {
    const interestPoints = await InterestPoint.find({
      where: { category: { id } },
      relations: ["category", "city", "pictures"],
    });
    return interestPoints;
  }

  @Query(() => [InterestPoint])
  async getInterestPointsByCity(@Arg("cityId") id: string) {
    const interestPoints = await InterestPoint.find({
      where: { city: { id } },
      relations: ["category", "city", "pictures"],
    });
    return interestPoints;
  }

  @Query(() => InterestPoint)
  async getInterestPointById(@Arg("interestPointId") id: string) {
    const interestPoint = await InterestPoint.findOneOrFail({
      where: { id },
      relations: ["category", "city", "pictures"],
    });
    return interestPoint;
  }

  @Query(() => Number)
  async getPlaceCount(): Promise<number> {
    return await InterestPoint.count();
  }

  @Mutation(() => InterestPoint)
  async createInterestPoint(@Arg("data") data: InterestPointInput) {
    const city = await City.findOneOrFail({ where: { id: data.city } });
    const category = await Category.findOneOrFail({
      where: { id: data.category },
    });

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
		let interestPoint = await InterestPoint.findOne({
			where: {id: id},
			relations: ["category", "pictures"]
		})
		if (!interestPoint) throw new Error("oupsi.")
		console.log(interestPoint)
		let newcategory: Category
		if(interestPoint.category.id !== data.category) {
			newcategory = await Category.findOneByOrFail({id: data.category})
		} else newcategory = interestPoint.category
		interestPoint = Object.assign(interestPoint, {
			...data,
			category: newcategory
		})
		await interestPoint.save()
		console.log(interestPoint)
		return interestPoint;
	}
}
