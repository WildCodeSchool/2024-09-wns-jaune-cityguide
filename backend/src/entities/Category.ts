import { Field, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { InterestPoint } from "./InterestPoint";

@Entity()
@ObjectType()
export class Category extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id!: string;

	@Field()
	@Column()
	name!: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	description?: string;

	@Field()
	@Column()
	color!: string;

	@Field(() => InterestPoint)
	@OneToMany(
		() => InterestPoint,
		(interestPoint) => interestPoint.category,
	)
	interestPoints?: InterestPoint[];

	@Field(() => Date)
	@CreateDateColumn({
		name: "created_at",
		type: "timestamptz",
		default: () => "CURRENT_TIMESTAMP",
	})
	createdAt!: Date;

	@Field(() => Date, { nullable: true })
	@UpdateDateColumn({
		name: "updated_at",
		type: "timestamptz",
		nullable: true,
	})
	updatedAt?: Date;
}
