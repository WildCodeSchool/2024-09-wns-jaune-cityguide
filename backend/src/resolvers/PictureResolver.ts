import { Arg, Field, ID, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { InterestPoint } from "../entities/InterestPoint";
import { Picture } from "../entities/Picture";
import { Transform, Type } from "class-transformer";
import {
  IsInt, IsString, IsUrl, Length, Max, Min 
} from "class-validator";
import { checkIdFormat, notFoundError } from "../utils/errors";
import { sanitize } from "isomorphic-dompurify";
import { sanitizeObjectStrings } from "../utils/sanitize";

@InputType()
export class PictureInput {
	@Field()
  @Transform(({ value }) => value.trim())
  @IsString()
  @Length(2, 255)
	name!: string;

	@Field()
  @IsString()
  @Length(10, 2000)
	description!: string;

	@Field()
  @Transform(({ value }) => value.trim())
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
    checkIdFormat(id);
    const picture = await Picture.findOne({ 
      where: { id }, 
      relations: [
        "interestPoint", 
        "interestPoint.city"
      ] 
    });
    if (!picture) {
      throw notFoundError("L'image sélectionnée n'existe pas.");
    }
    return picture;
  }

  @Query(() => [Picture])
  async getPicturesByInterestPoint(@Arg("interestPointId") id: string) {
    checkIdFormat(id);
    const interestPoint = await InterestPoint.findOneBy({ id });
    if (!interestPoint) {
      throw notFoundError("Le point d'intérêt sélectionné n'existe pas.");
    }
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
    checkIdFormat(data.interestPoint);
    const interestPoint = await InterestPoint.findOne({ where: { id: data.interestPoint } });
    if (!interestPoint) {
      throw notFoundError("Le point d'intérêt sélectionné n'existe pas.");
    }
    const picture = new Picture();
    const cleanData = sanitizeObjectStrings(data, [
      "name",
      "description",
      "url",
    ]);
    Object.assign(picture, cleanData);
    picture.interestPoint = interestPoint;

    await picture.save();
    return picture;
  }
  
  @Mutation(() => Picture)
  async updatePictureById(@Arg("pictureId") id: string, @Arg("data") data: PictureInput) {
    let picture = await Picture.findOneByOrFail({ id });
    const cleanData = sanitizeObjectStrings(data, [
      "name",
      "description",
      "url",
    ]);
    picture = Object.assign(picture, cleanData);

    const interestPoint = await InterestPoint.findOneOrFail({ where: { id: data.interestPoint } });
    picture.interestPoint = interestPoint;
    
    await picture.save();
    return picture;
  }

  @Mutation(() => Boolean)
  async deletePictureById(@Arg("pictureId") id: string) {
    checkIdFormat(id);
    const picture = await Picture.findOne({ where: { id } });
    if (!picture) {
      throw notFoundError("L'image sélectionnée n'existe pas.");
    }
    return (await Picture.delete({ id })).affected;
  }
}