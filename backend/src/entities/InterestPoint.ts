import { Field, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	OneToMany,
} from "typeorm";
import { Category } from "./Category";
import { City } from "./City";
import { Picture } from "./Picture";

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

	@Field(() => Category)
	@ManyToOne(
		() => Category,
		(category) => category.interestPoints,
	)
	category!: Category;

	@Field(() => City)
	@ManyToOne(
		() => City,
		(city) => city.interestPoints,
		{ onDelete: "CASCADE", onUpdate: "CASCADE" },
	)
	city!: City;

	@Field(() => [Picture])
	@OneToMany(
		() => Picture,
		(picture) => picture.interestPoint,
		{ onDelete: "CASCADE", onUpdate: "CASCADE" },
	)
	pictures!: Picture[];
}
