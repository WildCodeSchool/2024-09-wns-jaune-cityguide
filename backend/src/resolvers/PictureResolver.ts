import { Field, InputType, ObjectType, Mutation, Resolver, ID, Arg, Query } from "type-graphql";
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

  @Query(() => [Picture])
  async getPictures() {
    const pictures = await Picture.find({ 
      relations: [
        "interestPoint", 
        "interestPoint.city"
      ] 
    });
    return pictures
  }

  @Query(() => Picture)
  async getPictureById(@Arg("pictureId") id: string) {
    const picture = await Picture.findOneOrFail({ 
      where: { id }, 
      relations: [
        "interestPoint", 
        "interestPoint.city"
      ] 
    });
    return picture;
  }

  async createPicture(@Arg("data") data: PictureInput) {
    const interestPoint = await InterestPoint.findOneOrFail({ where: { id: data.interestPoint } });

    const picture = new Picture();
    Object.assign(picture, data);
    picture.interestPoint = interestPoint;

    await picture.save();
    return picture;
  }
  
  @Mutation(() => Picture)
  async updatePictureById(@Arg("pictureId") id: string, @Arg("data") data: PictureInput) {
    let picture = await Picture.findOneByOrFail({ id });
    
    picture = Object.assign(picture, data);
    
    const interestPoint = await InterestPoint.findOneOrFail({ where: { id: data.interestPoint } });
    
    Object.assign(picture, data);
    picture.interestPoint = interestPoint;
    
    await picture.save();
    return picture;
  }
}