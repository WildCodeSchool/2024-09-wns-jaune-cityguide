import { Field, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	Entity,
	PrimaryGeneratedColumn,
	OneToMany,
} from "typeorm";
import { InterestPoint } from "./InterestPoint";

@Entity()
@ObjectType()
export class City extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id!: string;

	@Field()
	@Column()
	name!: string;

	@Field()
	@Column()
	postalCode!: string;

	@Field()
	@Column("float")
	lattitude!: number;

	@Field()
	@Column("float")
	longitude!: number;

	@Field(() => [InterestPoint])
	@OneToMany(
		() => InterestPoint,
		(interestPoint) => interestPoint.city,
	)
	interestPoints!: InterestPoint[];

	// @Field(() => [User])
	// @OneToMany(
	// 	() => User,
	// 	(user) => user.city,
	// )
	// users!: user[];
}
