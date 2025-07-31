import { Arg, Field, ID, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { InterestPoint } from "../entities/InterestPoint";
import { Picture } from "../entities/Picture";

import { Type } from "class-transformer";
import {
  IsInt, IsString, IsUrl, Length, Max, Min 
} from "class-validator";

@InputType()
export class PictureInput {
	@Field()
    @IsString()
  @Length(2, 255)
	name!: string;

	@Field()
  @IsString()
  @Length(10, 2000)
	description!: string;

	@Field()
    @IsUrl({ require_protocol: true })
	url!: string;

	@Field(() => ID)
  @Type(() => Number)
  @IsInt()
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

  @Query(() => [Picture])
  async getPicturesByInterestPoint(@Arg("interestPointId") id: string) {
    const pictures = await Picture.find({ 
      where: { interestPoint: { id } }, 
      relations: [
        "interestPoint", 
        "interestPoint.city"
      ] 
    });
    return pictures;
  }

  @Mutation(() => Picture)
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

  @Mutation(() => Boolean)
  async deletePictureById(@Arg("pictureId") id: string) {
    return (await Picture.delete({ id })).affected;
  }
}