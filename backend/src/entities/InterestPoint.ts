import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class InterestPoint extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id!: string;

	@Field()
	@Column()
	name!: string;

	@Field()
	@Column()
	description!: string;

	@Field()
	@Column()
	address!: string;

	@Field()
	@Column("float")
	latitude!: number;

	@Field()
	@Column("float")
	longitude!: number;

	@Field()
	@Column()
	link_url!: string;

	// TODO: add FKs: id_city and category_id

	// @Field(() => Category)
	// @ManyToOne(
	// 	() => Category,
	// 	(category) => category.interestPoints,
	// )
	// id_category!: Category;

	// @Field(() => City)
	// @ManyToOne(
	// 	() => City,
	// 	(city) => category.interestPoints,
	// )
	// id_city!: City;
}
