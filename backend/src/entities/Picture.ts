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
export class Picture extends BaseEntity {
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
	@Column("float")
	url!: number;

	@Field(() => InterestPoint)
	@OneToMany(
		() => InterestPoint,
		(interestPoint) => interestPoint.pictures,
	)
	interestPoint!: InterestPoint;
}
