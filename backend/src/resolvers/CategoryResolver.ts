import { 
  Arg,
  Field,
  InputType,
  Query,
  Resolver,
  Mutation,
  ID,
  Ctx,
 } from "type-graphql";
import { Category } from "../entities/Category";
import { requireRole } from "../middleware/authChecker";
import { UserRole } from "../entities/User";

interface Context {
  user?: { id: string; role: UserRole };
}

@InputType()
class CategoryInput {
  @Field()
  name!: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  color!: string;
}

@InputType()
class UpdateCategoryInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
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
    const category = await Category.findOneOrFail({ where: { id } });
    return category;
  }

  @Mutation(() => Category)
  async createCategory(
    @Arg("data") data: CategoryInput,
    @Ctx() { user }: Context
) {
   requireRole(user, [UserRole.SUPER_ADMIN]);

    const category = new Category();
    Object.assign(category, data);
    await category.save();
    return category;
  }

  @Mutation(() => Category)
  async replaceCategoryById(
    @Arg("categoryId") id: string,
    @Arg("data") data: UpdateCategoryInput,
    @Ctx() { user }: Context
  ) {

    requireRole(user, [UserRole.SUPER_ADMIN]);

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
  async deleteCategoryById(
    @Arg("categoryId") id: string,
    @Ctx() { user }: Context
) {

    requireRole(user, [UserRole.SUPER_ADMIN]);
    
    return (await Category.delete({ id })).affected;
  }
}
