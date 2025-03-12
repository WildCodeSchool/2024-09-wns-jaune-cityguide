import { Arg, Field, InputType, Query, Resolver, Mutation, ID } from "type-graphql";
import { Category } from "../entities/Category";
import type { InterestPoint } from "../entities/InterestPoint";

@InputType()
class CategoryInput {
  @Field()
  id!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  color!: string;

  @Field(() => [ID])
  interestPoints!: InterestPoint[];
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
    const category = await Category.findOneOrFail({ where: { id } });
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
    @Arg("data") data: CategoryInput
  ) {
    const category = await Category.findOneByOrFail({ id });
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
    return (await Category.delete({ id })).affected;
  }
}
