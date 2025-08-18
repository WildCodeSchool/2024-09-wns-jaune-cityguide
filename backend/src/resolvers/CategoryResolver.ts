import { Transform } from "class-transformer";
import {
  IsString, Length,
  Matches
} from "class-validator";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Category } from "../entities/Category";
import { badUserInputError, checkIdFormat, notFoundError } from "../utils/errors";
import { sanitizeObjectStrings } from "../utils/sanitize";

@InputType()
class CategoryInput {
  @Field()
  @Transform(({ value }) => value.trim())
  @IsString({ message: "Category name must be a string." })
  @Length(2, 100, {
    message: "Category name must be between 2 and 100 characters.",
  })
  name!: string;

  @Field({ nullable: true })
  @Transform(({ value }) => value.trim())
  @IsString()
  @Length(10, 2000)
  description?: string;

  @Field()
  @Transform(({ value }) => value.trim().toLowerCase())
  @IsString()
  @Matches(/^#[0-9a-fA-F]{6}$/, {
    message: "Color must be a valid hexadecimal code (ex: #aabbcc)",
  })
  color!: string;
}

@InputType()
class UpdateCategoryInput {
  @Field({ nullable: true })
  @Transform(({ value }) => value.trim())
  @IsString({ message: "Category name must be a string." })
  @Length(2, 100, {
    message: "Category name must be between 2 and 100 characters.",
  })
  name?: string;

  @Field({ nullable: true })
  @Transform(({ value }) => value.trim())
  @IsString()
  @Length(10, 2000)
  description?: string;

  @Field({ nullable: true })
  @Transform(({ value }) => value.trim().toLowerCase())
  @IsString()
  @Matches(/^#[0-9a-fA-F]{6}$/, {
    message: "Color must be a valid hexadecimal code (ex: #aabbcc)",
  })
  color?: string;
}

@Resolver(Category)
export class CategoryResolver {
  @Query(() => [Category])
  async getCategories() {
    const categories = await Category.find();
    return categories;
  }

  @Query(() => Category)
  async getCategoryById(@Arg("categoryId") id: string) {
    checkIdFormat(id);
    const category = await Category.findOne({ where: { id } });
    if (!category) {
      throw notFoundError("Selected category does not exist.");
    }
    return category;
  }

  @Mutation(() => Category)
  async createCategory(@Arg("data") data: CategoryInput) {
    const existingCategory = await Category.findOne({ where: { name: data.name } });
    if (existingCategory) throw badUserInputError("A category with this name already exists.", "CATEGORY_ALREADY_EXISTS");
    const category = new Category();
    const cleanData = sanitizeObjectStrings(data, [
      "name",
      "description",
      "color",
    ]);
    Object.assign(category, cleanData);
    await category.save();
    return category;
  }

  @Mutation(() => Category)
  async replaceCategoryById(
    @Arg("categoryId") id: string,
    @Arg("data") data: UpdateCategoryInput
  ) {
    checkIdFormat(id);
    const category = await Category.findOneBy({ id });
    if (!category) {
      throw notFoundError("Selected category does not exist.");
    }
    const cleanData = sanitizeObjectStrings(data, [
      "name",
      "description",
      "color",
    ]);
    Object.assign(category, cleanData);
    await category.save();
    return category;
  }

  @Mutation(() => Boolean)
  async deleteCategoryById(@Arg("categoryId") id: string) {
    checkIdFormat(id);
    const category = await Category.findOne({ where: { id } });
    if (!category) {
      throw notFoundError("Selected category does not exist.");
    }
    return (await Category.delete({ id })).affected;
  }
}
