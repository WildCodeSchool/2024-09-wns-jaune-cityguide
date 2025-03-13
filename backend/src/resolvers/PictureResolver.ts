import { Field, InputType, ObjectType, Mutation, Resolver, ID, Arg } from "type-graphql";
import { Picture } from "../entities/Picture";
import { InterestPoint } from "../entities/InterestPoint";

@InputType()
export class PictureInput {
	@Field()
	name!: string;

	@Field()
	description!: string;

	@Field()
	url!: string;

	@Field(()=> ID)
	interestPoint!: string;
}

@Resolver(Picture)
export class PictureResolver {
  @Mutation(() => Picture)
  async createPicture(@Arg("data") data: PictureInput) {
    const interestPoint = await InterestPoint.findOneOrFail({ where: { id: data.interestPoint } });

    const picture = new Picture();
    Object.assign(picture, data);
    picture.interestPoint = interestPoint;

    await picture.save();
    return picture;
  }
}