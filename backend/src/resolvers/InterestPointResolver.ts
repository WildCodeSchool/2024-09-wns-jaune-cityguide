import {IsArray, isInt, IsNumber, IsOptional, isPositive, IsString, IsUrl, Length, Max, Min } from "class-validator";
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
import { checkIdFormat, notFoundError } from "../utils/errors";
import { Transform } from "class-transformer";
import { sanitizeObjectStrings } from "../utils/sanitize";

@InputType()
export class InterestPointInput {
  @Field()
  @Transform(({ value }) => value.trim())
  @IsString({ message: "Le nom du point d'intérêt doit être une chaîne de caractères." })
  @Length(2, 255)
  name!: string;

  @Field()
  @IsString({ message: "La description doit être une chaîne de caractères." })
  @Length(10, 2000)
  description!: string;

  @Field()
  @Transform(({ value }) => value.trim())
  @IsString({ message: "L'adresse doit être une chaîne de caractères" })
  @Length(2, 255, {
    message: "L'adresse doit contenir entre 2 et 255 caractères.",
  })
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
  @Transform(({ value }) => value.trim())
  @IsUrl({require_protocol: true})
  link_url!: string;

  @Field(() => ID)
  @IsString()
  city!: string;

  @Field(() => ID)
  @IsString()
  category!: string;

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
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
    checkIdFormat(id);
    const category = await Category.findOne({ where: { id } });
    if (!category) throw notFoundError("La catégorie sélectionnée n'existe pas.");
    const interestPoints = await InterestPoint.find({
      where: { category: { id } },
      relations: ["category", "city", "pictures"],
    });
    return interestPoints;
  }

  @Query(() => [InterestPoint])
  async getInterestPointsByCity(@Arg("cityId") id: string) {
    checkIdFormat(id);
    const city = await City.findOne({ where: { id } });
    if (!city) throw notFoundError("La ville sélectionnée n'existe pas.");
    const interestPoints = await InterestPoint.find({
      where: { city: { id } },
      relations: ["category", "city", "pictures"],
    });
    return interestPoints;
  }

  @Query(() => InterestPoint)
  async getInterestPointById(@Arg("interestPointId") id: string) {
    checkIdFormat(id);
    const interestPoint = await InterestPoint.findOne({
      where: { id },
      relations: ["category", "city", "pictures"],
    });
    if (!interestPoint) throw notFoundError("Le point d'intérêt sélectionné n'existe pas.");
    return interestPoint;
  }

  @Query(() => Number)
  async getPlaceCount(): Promise<number> {
    return await InterestPoint.count();
  }

  @Mutation(() => InterestPoint)
  async createInterestPoint(@Arg("data") data: InterestPointInput) {
    checkIdFormat(data.city);
    const city = await City.findOne({ where: { id: data.city } });
    if (!city) {
      throw notFoundError("La ville sélectionnée n'existe pas.");
    }
    checkIdFormat(data.category);
    const category = await Category.findOneBy({
      id: String(data.category),
    });
    if (!category) {
      throw notFoundError("La catégorie sélectionnée n'existe pas.");
    }

    let interestPoint = new InterestPoint();
    const cleanData = sanitizeObjectStrings(data, [
      "name",
      "description",
      "address",
      "link_url",
    ]);
    interestPoint = Object.assign(interestPoint, cleanData);
    interestPoint.city = city;
    interestPoint.category = category;

    await interestPoint.save();
    return interestPoint;
  }
	
	@Mutation(() => Boolean)
	async deleteInterestPointById( @Arg("interestPointId") id: string) {
    checkIdFormat(id);
    const interestPoint = await InterestPoint.findOneBy({id});
    if (!interestPoint) throw notFoundError("Le point d'intérêt sélectionné n'existe pas.");
		return (await InterestPoint.delete({id})).affected
	}
	
	@Mutation(() => InterestPoint)
	async replaceInterestPointById( @Arg("interestPointId") id: string, @Arg("data") data: InterestPointInput ) {
    checkIdFormat(id);
		let interestPoint = await InterestPoint.findOne({
			where: {id: id},
			relations: ["category", "pictures"]
		})
		if (!interestPoint) throw notFoundError("Le point d'intérêt sélectionné n'existe pas.");
		let newcategory: Category
    if(interestPoint.category.id !== String(data.category)) {
      newcategory = await Category.findOneByOrFail({id: String(data.category)})
    } else newcategory = interestPoint.category;
    const cleanData = sanitizeObjectStrings(data, [
      "name",
      "description",
      "address",
      "link_url",
    ]);
		interestPoint = Object.assign(interestPoint, {
			...cleanData,
			category: newcategory
		})
		await interestPoint.save()
		console.log(interestPoint)
		return interestPoint;
	}
}
