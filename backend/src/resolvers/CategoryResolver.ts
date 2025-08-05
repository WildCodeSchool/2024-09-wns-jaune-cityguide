import {
  IsString, Length,
  Matches
} from "class-validator";
import { Arg, Field, ID, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Category } from "../entities/Category";
import { checkIdFormat, notFoundError } from "../utils/errors";

@InputType()
class CategoryInput {
  @Field()
  @IsString({ message: "Le nom de la catégorie doit être une chaîne de caractères." })
  @Length(2, 100, {
    message: "Le nom de la catégorie doit contenir entre 2 et 100 caractères.",
  })
  name!: string;

  @Field({ nullable: true })
  @IsString()
  @Length(10, 2000)
  description?: string;

  @Field()
  @IsString()
  @Matches(/^#[0-9a-fA-F]{6}$/, {
  message: "La couleur doit être un code hexadécimal valide (ex: #aabbcc)",
})
  color!: string;
}

@InputType()
class UpdateCategoryInput {
  @Field({ nullable: true })
  @IsString({ message: "Le nom de la catégorie doit être une chaîne de caractères." })
  @Length(2, 100, {
    message: "Le nom de la catégorie doit contenir entre 2 et 100 caractères.",
  })
  name?: string;

  @Field({ nullable: true })
  @IsString()
  @Length(10, 2000)
  description?: string;

  @Field({ nullable: true })
  @IsString()
    @Matches(/^#[0-9a-fA-F]{6}$/, {
  message: "La couleur doit être un code hexadécimal valide (ex: #aabbcc)",
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
      throw notFoundError("La catégorie sélectionnée n'existe pas.");
    }
    return category;
  }

  @Mutation(() => Category)
  async createCategory(@Arg("data") data: CategoryInput) {
    const category = new Category();
    Object.assign(category, data);
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
      throw notFoundError("La catégorie sélectionnée n'existe pas.");
    }
    Object.assign(category, {
      name: data.name,
      description: data.description,
      color: data.color,
    });
    await category.save();
    return category;
  }

  @Mutation(() => Boolean)
  async deleteCategoryById(@Arg("categoryId") id: string) {
    checkIdFormat(id);
    const category = await Category.findOne({ where: { id } });
    if (!category) {
      throw notFoundError("La catégorie sélectionnée n'existe pas.");
    }
    return (await Category.delete({ id })).affected;
  }
}
